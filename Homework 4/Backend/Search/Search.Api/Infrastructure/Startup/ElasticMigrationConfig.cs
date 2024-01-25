using Nest;
using Search.Common.Documents;
using Search.ElasticMigrator;
using Search.ElasticMigrator.Models;

namespace Search.Api.Infrastructure.Startup;

using Alias = Common.Aliases.Search;

public static class ElasticMigrationConfig
{
    public static async Task ApplyElasticMigrations(this IServiceProvider services,
        IConfiguration configuration)
    {
        var migrator = services.GetService<IElasticMigrator>();

        if (migrator is not null)
        {
            var documents = new List<Document>
            {
                new()
                    { Id = Guid.NewGuid(), Name = "KirovskiKiro", Rating = 5.0, Location = "Vo Fantasy Land" }
            };

            var clusterNode = configuration.GetValue<string>("ElasticSearch:NodeName") ?? throw new ArgumentNullException("Cluster node name must not be null.");
                
            await migrator.MigrateAsync(new IndexMigration { NodeName = clusterNode, IndexVersion = "v1", IndexName = "winery", Aliases = new () { Alias.Winery }});
            await migrator.MigrateAsync(new IndexMigration { NodeName = clusterNode, IndexVersion = "v1", IndexName = "wine", Aliases = new () { Alias.Winery }});

            if (!await migrator.IndexHasRowsAsync("winery-v1"))
            {
                await migrator.PopulateAsync("winery-v1", documents);
            }
        }
    }
}