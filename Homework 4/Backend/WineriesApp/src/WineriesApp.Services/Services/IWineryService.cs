using WineriesApp.DataContext.Models;
using WineriesApp.Services.Models;
using WineriesApp.Services.Models.Filters;

namespace WineriesApp.Services.Services
{
    public interface IWineryService
    {
        Task<List<Winery>> FilterWineries(WineriesFilter filter);

        Task<List<Winery>> GetTopWineries();

        Task<Winery?> GetWinery(Guid id);
    }
}
