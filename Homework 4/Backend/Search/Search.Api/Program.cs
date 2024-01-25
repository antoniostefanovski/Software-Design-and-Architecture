using System.Security.Authentication;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Search.Api.Infrastructure.Startup;
using Search.Api.Services;

namespace Search.Api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
            builder.WebHost.ConfigureKestrel((context, options) =>
            {
                options.ListenAnyIP(7279, listenOptions =>
                {
                    listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                    listenOptions.UseHttps(options =>
                    {
                        options.SslProtocols = SslProtocols.Tls12;
                    });
                });
            });

            // Add services to the container.

            builder.Services.AddControllers();
            
            // Grpc
            builder.Services.ConfigureGrpcServices();
            
            // Logging
            builder.Services.ConfigureLogging();
            
            // ElasticSearch
            builder.Services.AddElasticClient(builder.Configuration, builder.Environment);

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();
            
            app.MapControllers();

            app.MapGrpcService<IngestionServiceV1>();

            // Apply Elasticsearch migrations
            await app.Services.ApplyElasticMigrations(app.Configuration);

            await app.RunAsync();
        }
    }
}