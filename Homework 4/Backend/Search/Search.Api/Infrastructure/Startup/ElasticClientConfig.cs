namespace Search.Api.Infrastructure.Startup;

public static class ElasticClientConfig
{
    public static IServiceCollection AddElasticClient(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
        => services
            .AddTransient<IElasticClient>(factory =>
            {
                var nodes = configuration
                    .GetSection("ElasticSearch:Nodes")
                    ?.GetChildren()
                    ?.Select(x => new Uri(x.Value));

                if (!(nodes?.Any() ?? false))
                {
                    throw new ArgumentException("No elasticsearch nodes defined.");
                }

                IConnectionPool pool = nodes.Count() == 1
                    ? new SingleNodeConnectionPool(nodes.First())
                    : new StaticConnectionPool(nodes);

                var settings = new ConnectionSettings(pool)
                    .BasicAuthentication(configuration.GetValue<string>("ElasticSearch:Username"), configuration.GetValue<string>("ElasticSearch:Password"))
                    .EnableApiVersioningHeader();

                if (environment.IsDevelopment())
                {
                    settings = settings
                        .EnableDebugMode();
                }

                return new ElasticClient(settings);
            })
            .AddTransient<IIndexer, ElasticIndexer>();
}