using Microsoft.EntityFrameworkCore;
using WineriesApp.DataContext.Extensions;
using WineriesApp.DataContext.Models;

namespace WineriesApp.DataContext
{
    public class WineriesDbContext : DbContext
    {
        public WineriesDbContext(DbContextOptions<WineriesDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.RemovePluralizingTableNameConvention();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Winery> Wineries { get; set; }
    }
}