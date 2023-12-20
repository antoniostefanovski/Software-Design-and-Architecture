using Microsoft.EntityFrameworkCore;
using WineriesApp.DataContext;
using WineriesApp.DataContext.Models;
using WineriesApp.Services.Models.Filters;

namespace WineriesApp.Services.Services;

public class WineService : IWineService
{
    private readonly WineriesDbContext context;

    public WineService(WineriesDbContext context)
    {
        this.context = context;
    }
    
    public Task<List<Wine>> FilterWines(WinesFilter filter)
    {
        bool WhereQuery(Wine wine)
        {
            var condition = true;
            
            if (!string.IsNullOrEmpty(filter.SearchTerm))
            {
                condition = condition && wine.Name.ToLower().Contains(filter.SearchTerm.ToLower());
            }

            if (filter.Ratings.Any())
            {
                condition = condition && filter.Ratings.Any(r => wine.Rating >= r);
            }

            if (filter.Types.Any())
            {
                condition = condition && filter.Types.Any(l => wine.Type == l);
            }

            return condition;
        }

        return Task.FromResult(context.Wines.Where(WhereQuery).ToList());
    }

    public Task<Wine?> GetWine(Guid id)
    {
        return context.Wines.Include(w => w.Wineries).FirstOrDefaultAsync(w => w.Id == id);
    }
}