using Microsoft.AspNetCore.Mvc;
using WineriesApp.DataContext.Models;
using WineriesApp.Services.Services;

namespace WineriesApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WineriesController : ControllerBase
    {
        private readonly IWineryService wineryService;

        public WineriesController(IWineryService wineryService)
        {
            this.wineryService = wineryService;
        }

        [HttpGet("wineries")]
        public async Task<List<Winery>> SearchWineries(string? searchTerm, double? rating)
            => await wineryService.SearchWineriesByName(searchTerm, rating);
    }
}
