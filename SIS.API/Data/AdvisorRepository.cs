using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SIS.API.Models;

namespace SIS.API.Data
{
    public class AdvisorRepository : IAdvisorRepository
    {
        private readonly DataContext _context;
        public AdvisorRepository(DataContext context)
        {
            this._context = context;
        }
        public async Task<Advisors> AddAdvisor(Advisors advisor)
        {
            await _context.Advisors.AddAsync(advisor);
            // await _context.Advisors.Remove
            await _context.SaveChangesAsync();

            return advisor;
        }

        public async Task<bool> AdvisorExists(string fullname)
        {
            if (await _context.Advisors.AnyAsync(x => x.FullName == fullname))
                return true;

            return false;
        }

        public async Task<bool> RemoveAdvisor(Advisors advisor)
        {
            var toBeDelete = await _context.Advisors.FirstOrDefaultAsync(x => x.FullName == advisor.FullName);
            // var toBeDelete = await _context.Advisors.FindAsync(advisor.Id);
            _context.Advisors.Remove(toBeDelete);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}