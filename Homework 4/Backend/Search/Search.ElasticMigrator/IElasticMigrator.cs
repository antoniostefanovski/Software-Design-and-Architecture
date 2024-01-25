using Search.Common.Documents;
using Search.ElasticMigrator.Models;

namespace Search.ElasticMigrator;

public interface IElasticMigrator
{
    Task MigrateAsync(IndexMigration migration);

    Task PopulateAsync(string indexName, IEnumerable<Document> documents, CancellationToken token = default);

    Task<bool> IndexExistsAsync(string indexName);

    Task<bool> IndexHasRowsAsync(string indexName);
}