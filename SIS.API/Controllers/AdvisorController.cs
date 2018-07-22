using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIS.API.Data;
using SIS.API.Dtos;
using SIS.API.Models;

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;


using SIS.API.Helpers;
using System.IO;

namespace SIS.API.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    public class AdvisorController : Controller {
        private readonly IDatingRepository _repo;
       //  private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IAdvisorRepository _advisorRepo;

        public AdvisorController (IDatingRepository repo, 
            IConfiguration config,
            IMapper mapper,
            IAdvisorRepository advisorRepo) {
            _config = config;
            _repo = repo;
            // _mapper = mapper;
            _advisorRepo = advisorRepo;
        }

        [HttpPost ("addadvisor")]
        public async Task<IActionResult> AddAdvisor ([FromBody] AdvisorForCreateDto advisorForCreateDto) {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();
            
            if (await _advisorRepo.AdvisorExists (advisorForCreateDto.FullName))
                ModelState.AddModelError ("Advisor Name", "Advisor Name already exists");
            
            if (!ModelState.IsValid)
                return BadRequest (ModelState);
            
            var advisorToCreate = new Advisors {
                FullName = advisorForCreateDto.FullName,
                FirstName = advisorForCreateDto.FirstName,
                LastName = advisorForCreateDto.LastName,
                Title = advisorForCreateDto.Title
            };

            var createAdvisor = await _advisorRepo.AddAdvisor(advisorToCreate);

            return StatusCode (201);
        }

        [HttpGet ("removeadvisor/{id}")]
        public async Task<IActionResult> RemoveAdvisor (int id) {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(! await _repo.GetUserLevelAdmin(currentUserId))
                return Unauthorized();
            
            //if (!await _advisorRepo.AdvisorExists (advisorForCreateDto.FullName))
            //    ModelState.AddModelError ("Advisor Name", "Advisor Name doesn't exists");
            if (!await _advisorRepo.AdvisorIDExists (id))
                ModelState.AddModelError ("Advisor Name", "Advisor Name doesn't exists");
            
            if (!ModelState.IsValid)
                return BadRequest (ModelState);
            
            /* var advisorToDelete = new Advisors {
                FullName = advisorForCreateDto.FullName,
                FirstName = advisorForCreateDto.FirstName,
                LastName = advisorForCreateDto.LastName,
                Title = advisorForCreateDto.Title
            }; */

            // var deleteAdvisor = await _advisorRepo.RemoveAdvisor(advisorToDelete);
            var deleteAdvisor = await _advisorRepo.RemoveAdvisor(id);

            return StatusCode (201);
        }
    }
}