using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using WineriesApp.DataContext.Helpers;
using WineriesApp.Common.Filters;
using WineriesApp.Common.Pipes;

#nullable disable

namespace WineriesApp.DataContext.Migrations
{
    public partial class Populate_With_Initial_Data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            using var dbContext = DbContextHelper.GetDbContext();
            var wineries = MapDataHelper.GetWineries();

            if (!wineries.Any())
            {
                return;
            }

            dbContext.Wineries.AddRange(wineries);
            dbContext.SaveChanges();
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
