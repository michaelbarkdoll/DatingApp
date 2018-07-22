using System.Threading.Tasks;
using SIS.API.Models;

namespace SIS.API.Data
{
    public interface IAdvisorRepository
    {
         Task<Advisors> AddAdvisor(Advisors advisor);   
         Task<bool> AdvisorExists(string fullname);
         Task<bool> RemoveAdvisor(int id);
         Task<bool> AdvisorIDExists(int id);
    }
}