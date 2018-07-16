using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SIS.API.Data;
using SIS.API.Dtos;
using SIS.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace SIS.API.Controllers {
    [Route ("api/[controller]")]
    public class AuthController : Controller {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public AuthController (IAuthRepository repo, IConfiguration config, IMapper mapper) {
            _config = config;
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost ("register")]
        public async Task<IActionResult> Register ([FromBody] UserForRegisterDto userForRegisterDto) {
            if(!string.IsNullOrEmpty(userForRegisterDto.Username))
                userForRegisterDto.Username = userForRegisterDto.Username.ToLower ();

            if (await _repo.UserExists (userForRegisterDto.Username))
                ModelState.AddModelError ("Username", "Username already exists");

            //validate request
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            var userToCreate = new User {
                Username = userForRegisterDto.Username
            };

            var createUser = await _repo.Register (userToCreate, userForRegisterDto.Password);

            return StatusCode (201);
        }

        [HttpPost ("login")]
        public async Task<IActionResult> Login ([FromBody] UserForLoginDto userForLoginDto) {
            var userFromRepo = await _repo.Login (userForLoginDto.Username.ToLower (), userForLoginDto.Password);

            // In repository we return null if the password doesn't match
            if (userFromRepo == null)
                return Unauthorized (); // Don't tell them if the username exists or not.

            // generate JWT token 
            var tokenHandler = new JwtSecurityTokenHandler ();

            // Need to create a key to sign our token, so it can be validated by the server
            // For now as a hard coded string on our controller, but we'll soon remove it and put it in our configuration
            // Key must be coded as a bytesarray
            var key = Encoding.ASCII.GetBytes (_config.GetSection ("AppSettings:Token").Value);
            //var key = Encoding.ASCII.GetBytes ("super secret key");
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new Claim[] {
                new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString ()),
                new Claim (ClaimTypes.Name, userFromRepo.Username)
                }),
                Expires = DateTime.Now.AddDays (1),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken (tokenDescriptor);
            var tokenString = tokenHandler.WriteToken (token);

            var user = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok (new { tokenString, user });
        }
    }
}