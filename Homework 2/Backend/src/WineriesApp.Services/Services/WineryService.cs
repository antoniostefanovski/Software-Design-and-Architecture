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

        public Task<List<Winery>> SearchWineriesByName(string? searchTerm, double[] ratings)
        {
            Func<Winery, bool> whereQuery = v => true;

            if (!string.IsNullOrEmpty(searchTerm) && ratings.Any())
            {
                whereQuery = v => v.Name.ToLower().Contains(searchTerm.ToLower()) && ratings.Any(r => v.Rating >= r);
            } else if (searchTerm is not null)
            {
                whereQuery = v => v.Name.ToLower().Contains(searchTerm.ToLower());
            } else if (ratings.Any())
            {
                whereQuery = v => ratings.Any(r => v.Rating >= r);
            }

            return Task.FromResult(context.Wineries.Where(whereQuery).ToList());
        }
    }
}
