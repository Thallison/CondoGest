using Microsoft.EntityFrameworkCore;

namespace User.Helpers
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

        public DbSet<User.Entities.User> Users { get; set; }
    }
}
