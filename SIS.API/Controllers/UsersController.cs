using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using SIS.API.Data;
using SIS.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SIS.API.Helpers;
using System.IO;

namespace SIS.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route ("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers() 
        {
            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("pagedlist")]
        public async Task<IActionResult> GetUsersPagedList(UserParams userParams) 
        {
            // Gets the claim principle for the user executing the action. (The user from token essentially)
            // Gets the id of the current user
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Get the user from repo
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
            // userParams.Gender = userFromRepo.Gender;

            if (string.IsNullOrEmpty(userParams.Gender)) 
            {
                userParams.Gender = "all";
                // userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            if (string.IsNullOrEmpty(userParams.Advisor)) 
            {
                userParams.Advisor = null;
            }

            var users = await _repo.GetUsersPagedList(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            // Add Pagination Header
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);   // We're still return usersToReturn, but we should have a pagination header now.
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id) 
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);


            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            // Gets the claim principle for the user executing the action. (The user from token essentially)
            // Gets the id of the current user
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Get the user from the url
            var userFromRepo = await _repo.GetUser(id);

            // Check if an actual user is stored in userFromRepo
            if(userFromRepo == null)
                return NotFound($"Could not find user with an ID of {id}");
            
            // checked that currentUserId matches what was retrieved from the repo,
            // so only the currently logged in user can update their own profile
            if (currentUserId != userFromRepo.Id)
                return Unauthorized();
            
            // Take userForUpdateDto object and map it into our userFromRepo
            _mapper.Map(userForUpdateDto, userFromRepo);

            // need to save the changes
            if(await _repo.SaveAll())
                return NoContent(); // Status code 204 = Update

            throw new Exception($"Updating user {id} failed on save");
        }

        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetUserAsAdmin(int id) 
        {
            // Obtain user id from the token of the HttpGet request
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Verify that the token is an admin user, if true return requested user details
            if(await _repo.GetUserLevelAdmin(currentUserId)) {
                var user = await _repo.GetUser(id);
                var userToReturn = _mapper.Map<UserForDetailedDto>(user);

                return Ok(userToReturn);
            }
            
            return Unauthorized();
        }

        [HttpPut("admin/{id}")]
        public async Task<IActionResult> UpdateUserAsAdmin(int id, [FromBody] UserForUpdateDto userForUpdateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            // Gets the claim principle for the user executing the action. (The user from token essentially)
            // Gets the id of the current user
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Get the user from the url
            var userFromRepo = await _repo.GetUser(id);

            // Check if an actual user is stored in userFromRepo
            if(userFromRepo == null)
                return NotFound($"Could not find user with an ID of {id}");
            
            // checked that currentUserId matches what was retrieved from the repo,
            // so only the currently logged in user can update their own profile
            // if (currentUserId != userFromRepo.Id)
            //    return Unauthorized();
            
            if(! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();

            // Take userForUpdateDto object and map it into our userFromRepo
            _mapper.Map(userForUpdateDto, userFromRepo);

            // need to save the changes
            if(await _repo.SaveAll())
                return NoContent(); // Status code 204 = Update

            throw new Exception($"Updating user {id} failed on save");
        }

        [HttpGet("detailedusers")]
        public async Task<IActionResult> GetDetailedUsersAsAdmin() 
        {
            // Gets the claim principle for the user executing the action. (The user from token essentially)
            // Gets the id of the current user
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();

            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForDetailedDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("studentlist")]
        public async Task<IActionResult> GetStudentListAsAdmin() 
        {
            // Gets the claim principle for the user executing the action. (The user from token essentially)
            // Gets the id of the current user
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();

            var users = await _repo.GetUsers();
            // var usersToReturn = _mapper.Map<IEnumerable<UserForDetailedDto>>(users);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("advisorlist")]
        public async Task<IActionResult> GetAdvisorList() 
        {
            // Gets the claim principle for the user executing the action. (The user from token essentially)
            // Gets the id of the current user
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();

            // var users = await _repo.GetUsers();
            var advisors = await _repo.GetAdvisorsList();
            // var usersToReturn = _mapper.Map<IEnumerable<UserForDetailedDto>>(advisors);

            // return Ok(usersToReturn);
            return Ok(advisors);
        }
        
        [HttpGet("advisors")]
        public async Task<IActionResult> GetAdvisors()
        {
            var advisors = await _repo.GetAdvisors();
            return Ok(advisors);
        }

        [HttpGet("download/{filename}")]
        public async Task<IActionResult> Download(string filename)
        {
            if (filename == null)
                return Content("Filename not present");

            var path = Path.Combine(
                           Directory.GetCurrentDirectory(), filename);
            // return Ok(path);
            /* var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "wwwroot", filename); */

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.ms-excel"},
                /* {".xlsx", "application/vnd.openxmlformats
                           officedocument.spreadsheetml.sheet"}, */
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }
    }
}
