using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SIS.API.Data;
using SIS.API.Dtos;
using SIS.API.Helpers;
using SIS.API.Models;

namespace SIS.API.Controllers {
    [Authorize]
    [Route ("api/users/{userId}/files")]
    public class UserFilesController : Controller {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<DataRepoSettings> _dataRepoConfig;

        public UserFilesController (IDatingRepository repo, IMapper mapper, IOptions<DataRepoSettings> dataRepoConfig) {
            _repo = repo;
            _mapper = mapper;
            _dataRepoConfig = dataRepoConfig;
        }

        [HttpGet ("{id}", Name = "GetUserFile")]
        public async Task<IActionResult> GetUserFile (int id) {
            var fileFromRepo = await _repo.GetUserFile (id);

            // we dont want to return the file itself we want to return a dto
            var file = _mapper.Map<UserFileForReturnDto> (fileFromRepo);

            return Ok (file);
        }

        [HttpPost]
        public async Task<IActionResult> AddFileForUser(int userId, UserFilesForCreationDto userFileDto) {
            var user = await _repo.GetUser(userId);

            if(user == null)
                return BadRequest("Could not find user");

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            if (currentUserId != user.Id && ! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();

            var file = userFileDto.File; 

            if(file.Length > 0) {
                // full path to file in temp location
                // var filePath2 = Path.GetTempFileName();
               
                var uniqueGuid = Guid.NewGuid();
                var filePath = _dataRepoConfig.Value.UserFilesDirectory + "\\" + uniqueGuid + "-" + file.FileName; // _dataRepoConfig.Value.UserFilesDirectory + "\\" + user.Id + "-" + Guid.NewGuid() + "-" + file.FileName;
                
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                    fileStream.Close();
                }

                userFileDto.FilePath = filePath;
                userFileDto.FileName = uniqueGuid + "-" + file.FileName;
            }

            // Map userFileDto (source) to UserFile (dst)
            var addfile = _mapper.Map<UserFile>(userFileDto);   // We create this mapping inside AutoMapperProfile.cs
            
            addfile.User = user;
            addfile.UserId = user.Id;
            
/*             System.Console.WriteLine("-- Inside AddFileForUser --");
            System.Console.WriteLine(user.UserFiles == null ? "yes" : "no");
            System.Console.WriteLine(user.UserFiles.Count);
            System.Console.WriteLine("-- End AddFileForUser --"); */

            // Use repo dot add method
            // user.Photos.Add(photo);
            user.UserFiles.Add(addfile);
            System.Console.WriteLine($"UserId: {addfile.UserId}");

            

            // Save user back to database
            if (await _repo.SaveAll()){
                // We're mapping our photo into photoToReturn
                // photoToReturn is what we'll pass back and return

                var userFileToReturn = _mapper.Map<UserFileForReturnDto>(addfile);

                System.Console.WriteLine("-- Inside AddFileForUser --");
                System.Console.WriteLine(userFileToReturn.Url);
                System.Console.WriteLine(userFileToReturn.DateAdded);
                System.Console.WriteLine(userFileToReturn.Description);
                System.Console.WriteLine(userFileToReturn.isProject);
                System.Console.WriteLine(userFileToReturn.isThesis);
                System.Console.WriteLine(userFileToReturn.PublicId);
                System.Console.WriteLine(userFileToReturn.FileName);
                System.Console.WriteLine("-- End AddFileForUser --");

                // Three overload options
                // We'll use the string of a route name
                // This is the route to get the file that we just uploaded
                // Now we don't have a way to get an individual file at the moment either so we'll need to create that inside GetUserFile()
                return CreatedAtRoute("GetUserFile", new { id = addfile.Id }, userFileToReturn);
            }

            return BadRequest("Could not add the photo");
        }
        // End AddFileForUser

        // [HttpDelete("{photoId}")]
        [HttpDelete("{userFileId}")]
        // public async Task<IActionResult> DeletePhoto(int userId, int userFileId) 
        public async Task<IActionResult> DeleteFile(int userId, int userFileId) 
        {
            // UserId from token:
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Check that the user is valid
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            if ((userId != currentUserId)
                && ! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();

            var fileFromRepo = await _repo.GetUserFile(userFileId);

            if(fileFromRepo == null)
                return NotFound(); 
            
            _repo.Delete(fileFromRepo);

            var filePath = fileFromRepo.FilePath + "\\" + fileFromRepo.FileName;

            if(System.IO.File.Exists(@filePath)) {
                System.Console.WriteLine("File Existed");
                System.IO.File.Delete(@filePath);
                System.Console.WriteLine($"File Deleted: {{filePath}}");
            }

            if (await _repo.SaveAll())
                return Ok();     // Success status code of 204
            
            return BadRequest("Failed to delete the file");
        }










    }
    // End of UserFilesController
}