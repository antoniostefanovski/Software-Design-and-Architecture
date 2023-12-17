using Microsoft.AspNetCore.Mvc;
using WineriesApp.Services.Models;
using WineriesApp.Services.Models.Filters;
using WineriesApp.Services.Services;

namespace WineriesApp.Api.Controllers;

[ApiController]
[Route("api/wines")]
public class WinesController : ControllerBase
{
    private readonly IWineService wineService;

    public WinesController(IWineService wineService)
    {
        this.wineService = wineService;
    }
    
    [HttpPost("filter/search")]
    public async Task<IEnumerable<WineSearchInfo>> GetWinesBySearch([FromBody] WinesFilter model)
    {
        var wines = await wineService.FilterWines(model);

        return wines.Select(w => new WineSearchInfo
        {
            Id = w.Id,
            ImageUrl = w.PreviewImageUrl,
            Name = w.Name,
            Rating = w.Rating,
            Type = w.Type
        });
    }
    
    [HttpGet("{id}/details")]
    public async Task<WineInfo?> GetWineDetails(Guid id)
    {
        var wine = await wineService.GetWine(id);

        if (wine == null)
        {
            return null;
        }

        return new WineInfo
        {
            Id = id,
            ImageUrl = wine.MainImageUrl,
            Description = wine.Description.Split("^split^").ToList(),
            Name = wine.Name,
            Rating = wine.Rating,
            Type = wine.Type,
            Wineries = wine.Wineries.Select(w => new WineryPreviewInfo
            {
                Id = w.Id,
                Name = w.Name,
                Description = w.Description.Split("^split^").ToList(),
                ImageUrl = w.ImageUrl,
                Rating = w.Rating
            }).ToList()
        };
    }
}