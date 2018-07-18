using System.Collections.Generic;
using System.Threading.Tasks;
using SIS.API.Helpers;
using SIS.API.Models;

namespace SIS.API.Data
{
    public interface IDatingRepository
    {
         
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetUsers();
         Task<PagedList<User>> GetUsersPagedList(UserParams userParams);

         Task<User> GetUser(int id);
         Task<bool> GetUserLevelAdmin(int id);

         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForUser(int userId);
         // Task<List<string>> GetAdvisors();
         Task<IEnumerable<Advisor>> GetAdvisors();
    }
}