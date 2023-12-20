using Microsoft.AspNetCore.Mvc;
using WineriesApp.Services.Models;
using WineriesApp.Services.Models.Filters;
using WineriesApp.Services.Services;

namespace WineriesApp.Api.Controllers
{
    [ApiController]
    [Route("api/wineries")]
    public class WineriesController : ControllerBase
    {
        private readonly IWineryService wineryService;

        public WineriesController(IWineryService wineryService)
        {
            this.wineryService = wineryService;
        }

        [HttpPost("filter/search")]
        public async Task<IEnumerable<WinerySearchInfo>> GetWineriesBySearch([FromBody] WineriesFilter model)
        {
            var wineries = await wineryService.FilterWineries(model);

            return wineries.Select(w => new WinerySearchInfo
            {
                Id = w.Id,
                Latitude = w.Latitude,
                Longitude = w.Longitude,
                Name = w.Name,
                Rating = w.Rating,
                Url = w.Website,
                Contact = w.PhoneNumber,
                Address = w.Address,
                ImageUrl = w.ImageUrl
            });
        }

        [HttpGet("top-wineries")]
        public async Task<IEnumerable<WineryPreviewInfo>> GetTopWineries()
        {
            var wineries = await wineryService.GetTopWineries();

            return wineries.Select(w => new WineryPreviewInfo
            {
                Id = w.Id,
                Name = w.Name,
                Description = w.Description.Split("^split^").ToList(),
                ImageUrl = w.ImageUrl,
                Rating = w.Rating
            });
        }

        [HttpGet("{id}/details")]
        public async Task<WineriesInfo?> GetWineryDetails(Guid id)
        {
            var winery = await wineryService.GetWinery(id);

            if (winery == null)
            {
                return null;
            }

            return new WineriesInfo
            {
                Id = id,
                Name = winery.Name,
                Description = winery.Description.Split("^split^").ToList(),
                Address = winery.Address,
                Contact = winery.PhoneNumber,
                Rating = winery.Rating,
                Url = winery.Website,
                Longitude = winery.Longitude,
                Latitude = winery.Latitude,
                ImageUrl = winery.ImageUrl
            };
        }
    }
}
