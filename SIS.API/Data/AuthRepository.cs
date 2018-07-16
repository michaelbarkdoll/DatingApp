using System;
using System.Threading.Tasks;
using SIS.API.Models;
using Microsoft.EntityFrameworkCore;

namespace SIS.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            this._context = context;            
        }
        public async Task<User> Login(string username, string password)
        {
            // Compares username and password compared to what is stored in the database
            // var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Username == username);

            if (user == null) {
                return null;  // User does exist in DB
            }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) {
                return null;
            }

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)) {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++) {
                    if(computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;   
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // Add our context to our user, this doesnt actually save it back to our database
            // we still need to tell EF to save the changes we made back to our context
            await _context.Users.AddAsync(user);
            // Have EF save the changes back to the Database
            await _context.SaveChangesAsync();
            
            // return user to the calling method 
            return user;    // returns to our AuthController once we create it
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username == username))
                return true;

            return false;
        }
    }
}