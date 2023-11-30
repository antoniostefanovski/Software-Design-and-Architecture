using WineriesApp.DataContext.Models;

namespace WineriesApp.Services.Services
{
    public interface IWineryService
    {
        public Task<List<Winery>> SearchWineriesByName(string? searchTerm, double? Rating);
    }
}
