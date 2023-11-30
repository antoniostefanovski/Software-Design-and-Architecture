using Microsoft.EntityFrameworkCore;
using WineriesApp.DataContext;
using WineriesApp.DataContext.Models;

namespace WineriesApp.Services.Services
{
    public class WineryService : IWineryService
    {
        private readonly WineriesDbContext context;

        public WineryService(WineriesDbContext context)
        {
            this.context = context;
        }

        public Task<List<Winery>> SearchWineriesByName(string? searchTerm, double? Rating)
        {
            Func<Winery, bool> whereQuery = v => true;

            if (!string.IsNullOrEmpty(searchTerm) && Rating is not null)
            {
                whereQuery = v => v.Name.Contains(searchTerm) && v.Rating == Rating;
            }
            else if (searchTerm is not null)
            {
                whereQuery = v => v.Name.Contains(searchTerm);
            }

            if (Rating is not null)
            {
                whereQuery = v => v.Rating == Rating;
            }

            return context.Wineries.Where(whereQuery).AsQueryable().ToListAsync();
        }
    }
}
