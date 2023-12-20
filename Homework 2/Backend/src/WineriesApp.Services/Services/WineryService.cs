using Microsoft.EntityFrameworkCore;
using WineriesApp.DataContext;
using WineriesApp.DataContext.Models;
using WineriesApp.Services.Models;

namespace WineriesApp.Services.Services
{
    public class WineryService : IWineryService
    {
        private readonly WineriesDbContext context;

        public WineryService(WineriesDbContext context)
        {
            this.context = context;
        }

        public Task<List<Winery>> GetTopWineries()
        {
            return context.Wineries.OrderByDescending(w => w.Rating).Take(10).ToListAsync();
        }

        public Task<List<Winery>> FilterWineries(WineriesFilter filter)
        {
            bool WhereQuery(Winery winery)
            {
                var condition = true;

                if (!string.IsNullOrEmpty(filter.SearchTerm))
                {
                    condition = condition && winery.Name.ToLower().Contains(filter.SearchTerm.ToLower());
                }

                if (filter.Ratings.Any())
                {
                    condition = condition && filter.Ratings.Any(r => winery.Rating >= r);
                }

                if (filter.Locations.Any())
                {
                    condition = condition && filter.Locations.Any(l => winery.Municipality == l);
                }

                return condition;
            }

            return Task.FromResult(context.Wineries.Where(WhereQuery).ToList());
        }

        public Task<Winery?> GetWinery(Guid id)
        {
            return context.Wineries.FirstOrDefaultAsync(w => w.Id == id);
        }
    }
}
