using WineriesApp.Services.Services;

namespace WineriesApp.Api.Infrastructure.Startup
{
    public static class ServicesConfig
    {
        public static IServiceCollection ConfigureServices(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost3000",
                    builder => builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
                
                options.AddPolicy("AllowProductionFrontend",
                    builder => builder
                        .WithOrigins("https://winedonia.netlify.app")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
            
            services.AddScoped<IWineryService, WineryService>();
            services.AddScoped<IMunicipalityService, MunicipalityService>();
            services.AddScoped<IReviewService, ReviewService>();
            services.AddScoped<IWineService, WineService>();
            
            return services;
        }
    }
}