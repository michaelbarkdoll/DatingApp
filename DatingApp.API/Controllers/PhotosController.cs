using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        // In order to bring in our cloudinary configuration that is strongly typed we bring in IOptions of type CloudinarySettings (defined in CloudinarySettings.cs)
        public PhotosController(IDatingRepository repo,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            // Allows us to upload to the cloudinary platform using our account details
            _cloudinary = new Cloudinary(account);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id) {
            var photoFromRepo = await _repo.GetPhoto(id);

            // we dont want to return the photo itself we want to return a dto
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreationDto photoDto) {
            var user = await _repo.GetUser(userId);

            if(user == null)
                return BadRequest("Could not find user");

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            if (currentUserId != user.Id && ! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();

            var file = photoDto.File; 

            var uploadResult = new ImageUploadResult();

            if(file.Length > 0) {
                using (var stream = file.OpenReadStream()) {
                    // var fileStream = new FileStream($".{file.Name}", FileMode.Create, FileAccess.Write);
                    // MemoryStream destination = new MemoryStream();
                    // await stream.CopyToAsync(fileStream);
                    // await stream.CopyToAsync(destination);
                    // await destination.CopyToAsync(fileStream);
                    // await fileStream.CopyToAsync(destination);

                    var uploadParams = new ImageUploadParams() {
                        // FileDescription params: we could provide a path if we're retrieve the file from local storage
                        // or we can provide a stream
                        File = new FileDescription(file.Name, stream)
                        // File = new FileDescription(file.Name, destination)
                    };

                    // Upload file to cloudinary platofrm
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            // If it comes back successfully
            photoDto.Url = uploadResult.Uri.ToString();
            photoDto.PublicId = uploadResult.PublicId;

            // Now we need to map our PhotoDto to our actual photo entity
            // photoDto is the source
            // Photo is the destination

            // Map our photo into our photo entity
            var photo = _mapper.Map<Photo>(photoDto);   // We create this mapping from PhotoForCreationDto back to photo elsewhere
            photo.User = user;

            if(!user.Photos.Any(m => m.isMain)) {
                photo.isMain = true;
            }

            // Use repo dot add method
            user.Photos.Add(photo);

            // We're mapping our photo into photoToReturn
            // photoToReturn is what we'll pass back and return
            var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);

            // Save user back to database
            if (await _repo.SaveAll()){
                //return Ok();    // We fix this later

                // Three overload options
                // We'll use the string of a route name
                // This is the route to get the photo that we just uploaded
                // Now we don't have a way to get an individual photo at the moment either so we'll need to create that for starters
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int photoId) 
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var photoFromRepo = await _repo.GetPhoto(photoId);

            if(photoFromRepo == null)
                return NotFound();
            
            if (photoFromRepo.isMain)
                return BadRequest("This is already the main photo");
            
            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);

            if (currentMainPhoto != null)
                currentMainPhoto.isMain = false;

            photoFromRepo.isMain = true;

            if (await _repo.SaveAll())
                return NoContent();
            
            return BadRequest("Could not set photo to main");
        }
    }
}