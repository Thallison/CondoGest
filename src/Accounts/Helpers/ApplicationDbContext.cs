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
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 22));

            string mySqlConnectionStr = _configuration.GetConnectionString("DefaultConnection");
            options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr))
            .LogTo(Console.WriteLine, LogLevel.Information)
            .EnableSensitiveDataLogging()
            .EnableDetailedErrors();
        }

        public DbSet<Accounts.Entities.Accounts> Accounts { get; set; }
    }
}
