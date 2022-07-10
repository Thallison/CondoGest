using Microsoft.EntityFrameworkCore;

namespace Accounts.Helpers
{
    public class ApplicationDbContext : DbContext
    {
        protected readonly IConfiguration _configuration;

        public ApplicationDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            string mySqlConnectionStr = _configuration.GetConnectionString("DefaultConnection");
            options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr));
        }

        public DbSet<Accounts.Entities.Accounts> Accounts { get; set; }
    }
}
