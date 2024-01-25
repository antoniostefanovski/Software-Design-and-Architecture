using Search.Common.Documents;
using Search.Common.Enums;

namespace Search.Services.Searchers;

public interface IDocumentSearcher
{
    Task<List<Document>> SearchDocuments(EntityType type, string? searchTerm, string? rating, string? location,
        CancellationToken token = default);
}