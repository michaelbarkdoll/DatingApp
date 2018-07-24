using System.Collections.Generic;
using SIS.API.Models;
using Newtonsoft.Json;

namespace SIS.API.Data {
    public class Seed {
        private readonly DataContext _context;
        public Seed (DataContext context) {
            _context = context;

        }

        public void SeedUsers() {
            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();

            // seed users
            // var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var userData = System.IO.File.ReadAllText("Data/UserSeedDataF.json");

            // Deserialize this into objects
            var users = JsonConvert.DeserializeObject<List<User>>(userData);

            foreach(var user in users) {
                // We're not using the repository for this task, so we'll need to create the password hashes and salts from this file.
                //user.Username 

                // Create password hash
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                user.Username = user.Username.ToLower();

                if (user.Username.ToString().Equals("freda")) {
                    // user.SeniorProjectAdvisor = "Dr. None2";
                    user.UserLevel = "Admin";
                }
                else {
                    user.SeniorProjectAdvisor = "Dr. None";
                }
                // user.UserBachelorDetail.FacultyMentor = "Mico" + user.UserBachelorDetail.UserId;

                _context.Users.Add(user);
            }

            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}