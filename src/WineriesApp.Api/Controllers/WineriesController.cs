using Microsoft.AspNetCore.Mvc;
using WineriesApp.Services.Models;
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

        [HttpPost("wineries")]
        public async Task<IEnumerable<WineriesInfo>> SearchWineries(string? searchTerm, params double[] ratings)
        {
            var wineries = await wineryService.SearchWineriesByName(searchTerm, ratings);

            return wineries.Select(w => new WineriesInfo
            {
                Address = w.Address,
                Contact = w.PhoneNumber,
                Longitude = w.Longitude.ToString(),
                Latitude = w.Latitude.ToString(),
                Municipality = w.Municipality,
                Name = w.Name,
                Rating = w.Rating,
                Url = w.Website
            });
        }
    }
}
