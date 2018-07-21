using SIS.API.Models;
using Microsoft.EntityFrameworkCore;

namespace SIS.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Advisors> Advisors { get; set; }
        public DbSet<AdvisorDetails> UserAdvisorDetails { get; set; }
    }
}
