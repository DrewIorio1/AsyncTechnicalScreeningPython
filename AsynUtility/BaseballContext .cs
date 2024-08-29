/*
 *  BaseballContext - is the connection between the utility and the database databse
 */
using Microsoft.EntityFrameworkCore;

namespace AsynUtility
{
    public class BaseballContext : DbContext
    {
        public DbSet<Player> Players { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // TODO : this connection string
            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=Baseball;Trusted_Connection=True;TrustServerCertificate=true;");
        }
    }
}
