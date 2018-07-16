using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SIS.API.Models;
using Microsoft.EntityFrameworkCore;

namespace SIS.API.Data {
    public class DatingRepository : IDatingRepository {
        private readonly DataContext _context;

        public DatingRepository (DataContext context) {
            _context = context;

        }
        public void Add<T> (T entity) where T : class {
            _context.Add(entity);
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove(entity);
        }

        public async Task<User> GetUser (int id) {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers() {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();
            
            return users;
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> GetUserLevelAdmin (int id) {
            // var user = await _context.Users.Include(pp => pp.UserLevel).FirstOrDefaultAsync(u => u.Id == id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            // Console.WriteLine($"{user.Id} {user.UserLevel}");

            if(string.Equals(user.UserLevel, "Admin"))
                return true;

            return false;
        }

        public Task<Photo> GetPhoto(int id)
        {
            var photo = _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public Task<Photo> GetMainPhotoForUser(int userId)
        {
            // Returns the main photo from the user
            return _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.isMain);
        }
    }
}