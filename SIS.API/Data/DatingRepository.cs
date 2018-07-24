using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SIS.API.Models;
using Microsoft.EntityFrameworkCore;
using SIS.API.Helpers;

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
            var user = await _context.Users.Include(p => p.Photos).Include(p => p.UserFiles).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers() {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();
            
            return users;
        }

        public async Task<IEnumerable<Advisors>> GetAdvisorsList() {
            var advisors = await _context.Advisors.ToListAsync();

            return advisors;
        }

        public async Task<PagedList<User>> GetUsersPagedList(UserParams userParams) {
            // var users = await _context.Users.Include(p => p.Photos).ToListAsync();
            // var users = _context.Users.Include(p => p.Photos);    // .ToListAsync is in our pagination class
            // var users = _context.Users.Include(p => p.Photos).AsQueryable();    // .ToListAsync is in our pagination class
            var users = _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();    // .ToListAsync is in our pagination class

            // Filter out our own user from the list
            users = users.Where(u => u.Id != userParams.UserId);

            if (userParams.Gender == "male" || userParams.Gender == "female")
                users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.minAge != 15 || userParams.maxAge != 99)
            {
                users = users.Where(u => u.DateOfBirth.CalculateAge() >= userParams.minAge
                    && u.DateOfBirth.CalculateAge() <= userParams.maxAge);
            }

            if (!string.IsNullOrEmpty(userParams.Advisor))
            {
                switch (userParams.Advisor)
                {
                    case "all":
                        break;
                    default:
                        // users = users.Where(u => u.Advisor == userParams.Advisor);
                        users = users.Where(u => u.Advisor == userParams.Advisor
                            || u.BachelorFacultyMentor == userParams.Advisor
                            || u.MasterAdvisor == userParams.Advisor
                            || u.DoctorateAdvisor == userParams.Advisor
                            || u.SeniorProjectAdvisor == userParams.Advisor);
                        break;
                }
            }
                

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }
            
            // return users;
            // Now we're return users along with a PagedList
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
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

        public Task<UserFile> GetUserFile(int id)
        {
            var userFile = _context.UserFiles.FirstOrDefaultAsync(p => p.Id == id);
            return userFile;
        }

        public Task<Photo> GetMainPhotoForUser(int userId)
        {
            // Returns the main photo from the user
            return _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.isMain);
        }

        // public async Task<List<string>>GetAdvisors()
        public async Task<IEnumerable<Advisor>>GetAdvisors()
        {
            var advisors = await _context.Users.Select(a => a.Advisor).Distinct().ToListAsync();
            // var advisors = await _context.Advisors.Select(a => a.FirstName).Distinct().ToListAsync();

            List<Advisor> temp = new List<Advisor>();

            foreach(var element in advisors) {
                if(element != null) {
                    var advisor = new Advisor();
                    advisor.FullName = element;
                    temp.Add(advisor);
                }
            }
            return temp;
            // return advisors;
            // List<string> mylist = new List<string>(new string[] { "element1", "element2", "element3" });
            // return mylist;
        }
    }
}