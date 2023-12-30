using Microsoft.EntityFrameworkCore;
using WineriesApp.DataContext;
using WineriesApp.DataContext.Models;
using WineriesApp.Services.Models.Filters;

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
            return context.Wineries.OrderByDescending(w => w.Rating).Take(12).ToListAsync();
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
                    condition = condition && filter.Locations.Any(l => winery.Municipality?.Id == l);
                }

                return condition;
            }

            var skip = (int)(filter.BatchSize is not null && filter.BatchIndex is not null
                ? filter.BatchSize * filter.BatchIndex
                : 0);

            return Task.FromResult(context.Wineries
                .Include(w => w.Municipality)
                .Where(WhereQuery)
                .AsQueryable()
                .Skip(skip)
                .Take(filter.BatchSize + 1 ?? 21)
                .OrderByDescending(w => w.Rating)
                .ToList());
        }

        public Task<Winery?> GetWinery(Guid id)
        {
            return context.Wineries.FirstOrDefaultAsync(w => w.Id == id);
        }
    }
}
