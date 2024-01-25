using Grpc.Core;
using Search.Api.Protos;
using Search.Common.Enums;
using Search.Services.Searchers;

namespace Search.Api.Services;

public class IngestionServiceV1
    : IngestionV1.IngestionV1Base
{
    private readonly IDocumentSearcher searcher;

    public IngestionServiceV1(IDocumentSearcher searcher)
    {
        this.searcher = searcher;
    }
    
    public override async Task<FuzzySearchResponse> FuzzySearch(FuzzySearchRequest request, ServerCallContext context)
    {
        var documents = await this.searcher.SearchDocuments((EntityType)request.EntityType, request.SearchTerm,
            request.Rating, request.Location);

        var response = new FuzzySearchResponse();
        
        response.Documents.AddRange(documents.Select(x => new Document
        {
            Id = x.Id.ToString(),
            Location = x.Location,
            Name = x.Name,
            Rating = x.Rating
        }));
        response.Count = documents.Count;
        
        return response;
    }
}