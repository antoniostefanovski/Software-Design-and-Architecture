using Microsoft.EntityFrameworkCore;
using WineriesApp.DataContext;
using WineriesApp.DataContext.Enums;
using WineriesApp.DataContext.Models;
using WineriesApp.Services.Models;

namespace WineriesApp.Services.Services;

public class ReviewService : IReviewService
{
    private readonly WineriesDbContext context;

    public ReviewService(WineriesDbContext context)
    {
        this.context = context;
    }
    
    public Task<List<Review>> GetWineryReviews(Guid wineryId)
    {
        return context.Reviews.Where(r => r.Type == ReviewEntityType.Winery && r.Winery!.Id == wineryId).OrderByDescending(r => r.Rating).ToListAsync();
    }

    public Task<List<Review>> GetWineReviews(Guid wineId)
    {
        return context.Reviews.Where(r => r.Type == ReviewEntityType.Wine && r.Wine!.Id == wineId).OrderByDescending(r => r.Rating).ToListAsync();
    }

    public async Task AddReview(AddReview model)
    {
        var review = new Review
        {
            Rating = model.Rating,
            Comment = model.Comment,
            Type = model.EntityType,
            Date = DateTime.Now
        };

        switch (model.EntityType)
        {
            case ReviewEntityType.Winery:
                var winery = await context.Wineries.FirstOrDefaultAsync(w => w.Id == model.EntityId);
                review.Winery = winery;
                winery!.Rating = Math.Min(Math.Round(0.95 * winery.Rating + 0.05 * model.Rating, 2), 5.0);
                break;
            case ReviewEntityType.Wine:
                var wine = await context.Wines.FirstOrDefaultAsync(w => w.Id == model.EntityId);
                review.Wine = wine;
                wine!.Rating = Math.Min(Math.Round(0.95 * wine.Rating + 0.05 * model.Rating, 2), 5.0);
                break;
            default:
                throw new Exception("Unknown entity type");
        }

        await context.Reviews.AddAsync(review);
        await context.SaveChangesAsync();
    }
}