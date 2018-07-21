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

namespace SIS.API.Controllers {
    [Route ("api/[controller]")]
    public class AdvisorController : Controller {
        private readonly IAuthRepository _repo;
       //  private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IAdvisorRepository _advisorRepo;

        public AdvisorController (IAuthRepository repo, 
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

        [HttpPost ("removeadvisor")]
        public async Task<IActionResult> RemoveAdvisor ([FromBody] AdvisorForCreateDto advisorForCreateDto) {
            if (!await _advisorRepo.AdvisorExists (advisorForCreateDto.FullName))
                ModelState.AddModelError ("Advisor Name", "Advisor Name doesn't exists");
            
            if (!ModelState.IsValid)
                return BadRequest (ModelState);
            
            var advisorToDelete = new Advisors {
                FullName = advisorForCreateDto.FullName,
                FirstName = advisorForCreateDto.FirstName,
                LastName = advisorForCreateDto.LastName,
                Title = advisorForCreateDto.Title
            };

            var deleteAdvisor = await _advisorRepo.RemoveAdvisor(advisorToDelete);

            return StatusCode (201);
        }
    }
}