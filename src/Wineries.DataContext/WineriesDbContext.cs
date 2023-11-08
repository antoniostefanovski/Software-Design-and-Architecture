using Microsoft.EntityFrameworkCore;
using Wineries.DataContext.Extensions;
using Wineries.DataContext.Models;

namespace Wineries.DataContext
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