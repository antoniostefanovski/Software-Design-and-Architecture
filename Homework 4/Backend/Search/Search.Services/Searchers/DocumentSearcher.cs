using Nest;
using Search.Common.Documents;
using Search.Common.Enums;

namespace Search.Services.Searchers;

using Alias = Common.Aliases.Search;

public class DocumentSearcher
    : IDocumentSearcher
{
    private readonly IElasticClient client;
    
    private static readonly Dictionary<string, double> queryBoostPairs = new Dictionary<string, double>()
    {
        { "ExactSearch_Name", Math.Pow(2, 4) },
        { "PrefixQuery_Name", Math.Pow(2, 3.7) },
        { "MatchPhrase_Name", Math.Pow(2, 3) },
        { "ExactSearch_Location", Math.Pow(2, 2.6) },
        { "PrefixQuery_Location", Math.Pow(2, 2) },
        { "MatchPhrase_Location", Math.Pow(2, 1.7) },
        { "PrefixQuery_Rating", Math.Pow(2, 1.3) }
    };

    public DocumentSearcher(IElasticClient client)
    {
        this.client = client;
    }
    
    public async Task<List<Document>> SearchDocuments(EntityType type, string? searchTerm, string? rating, string? location, CancellationToken token = default)
    {
        var alias = type == EntityType.Winery ? Alias.Winery : Alias.Wine;
        var request = new SearchRequest<Document>(alias)
        {
            Size = 100,
            Source = new SourceFilter(),
            Fields = new[] { "content_type" }
        };
        
        var should = searchTerm?.Length > 0
                ? new List<QueryContainer> {
                    /*
                     * Exact search
                     * The search text is equvalent to the name of the document from start to end. Case-insensitive
                     */
                    new TermQuery { Field = $"{nameof(Document.Name).ToLowerInvariant()}.keyword", Value = searchTerm, CaseInsensitive = true, Boost = GetBoostValue("ExactSearch_Name"), Name = "ExactSearch_Name" },

                    /*
                     * Starts with
                     * Checks whether the name of the document starts with the search text. Case-insensitive
                     */
                    new PrefixQuery { Field = $"{nameof(Document.Name).ToLowerInvariant()}.keyword", Value = searchTerm, CaseInsensitive = true, Boost = GetBoostValue("PrefixQuery_Name"), Name = "PrefixQuery_Name" },

                    /*
                     * Phrase match
                     * Checks if all the words from the search text are present, in the specified order. Case-insensitive.
                     */
                    new MatchPhraseQuery { Field = nameof(Document.Name).ToLowerInvariant(), Query = searchTerm, Boost = GetBoostValue("MatchPhrase_Name"), Name = "MatchPhrase_Name" },
                }
                : new List<QueryContainer>();

        if (!string.IsNullOrEmpty(location))
        {
            should = should.Concat(new List<QueryContainer>
            {
                /*
                 * Exact search
                 * The search text is equvalent to the name of the document from start to end. Case-insensitive
                 */
                new TermQuery
                {
                    Field = $"{nameof(Document.Location).ToLowerInvariant()}.keyword", Value = searchTerm,
                    CaseInsensitive = true, Boost = GetBoostValue("ExactSearch_Location"), Name = "ExactSearch_Location"
                },

                /*
                 * Starts with
                 * Checks whether the name of the document starts with the search text. Case-insensitive
                 */
                new PrefixQuery
                {
                    Field = $"{nameof(Document.Location).ToLowerInvariant()}.keyword", Value = searchTerm,
                    CaseInsensitive = true, Boost = GetBoostValue("PrefixQuery_Location"), Name = "PrefixQuery_Location"
                },

                /*
                 * Phrase match
                 * Checks if all the words from the search text are present, in the specified order. Case-insensitive.
                 */
                new MatchPhraseQuery
                {
                    Field = nameof(Document.Location).ToLowerInvariant(), Query = searchTerm,
                    Boost = GetBoostValue("MatchPhrase_Location"), Name = "MatchPhrase_Location"
                }
            }).ToList();
        }
        
        if (!string.IsNullOrEmpty(location))
        {
            should = should.Concat(new List<QueryContainer>
            {
                /*
                 * Exact search
                 * The search text is equvalent to the name of the document from start to end. Case-insensitive
                 */
                new TermQuery
                {
                    Field = $"{nameof(Document.Location).ToLowerInvariant()}.keyword", Value = searchTerm,
                    CaseInsensitive = true, Boost = GetBoostValue("ExactSearch_Location"), Name = "ExactSearch_Location"
                },

                /*
                 * Starts with
                 * Checks whether the name of the document starts with the search text. Case-insensitive
                 */
                new PrefixQuery
                {
                    Field = $"{nameof(Document.Location).ToLowerInvariant()}.keyword", Value = searchTerm,
                    CaseInsensitive = true, Boost = GetBoostValue("PrefixQuery_Location"), Name = "PrefixQuery_Location"
                },

                /*
                 * Phrase match
                 * Checks if all the words from the search text are present, in the specified order. Case-insensitive.
                 */
                new MatchPhraseQuery
                {
                    Field = nameof(Document.Location).ToLowerInvariant(), Query = searchTerm,
                    Boost = GetBoostValue("MatchPhrase_Location"), Name = "MatchPhrase_Location"
                }
            }).ToList();
        }

        if (!string.IsNullOrEmpty(rating))
        {
            should.Add(
                /*
                 * Starts with
                 * Checks whether the name of the document starts with the search text. Case-insensitive
                 */
                new PrefixQuery
                {
                    Field = $"{nameof(Document.Rating).ToLowerInvariant()}.keyword", Value = rating,
                    CaseInsensitive = true, Boost = GetBoostValue("PrefixQuery_Rating"), Name = "PrefixQuery_Rating"
                });
        }
        
        request.Query = new BoolQuery
        {
            Should = should,
            MinimumShouldMatch = searchTerm?.Length > 0 ? 1 : 0
        };
        
        var response = await client.SearchAsync<Document>(request, token);

        return BuildDocuments(response);
    }

    private List<Document> BuildDocuments(ISearchResponse<Document> response)
    {
        var hits = new List<Document>();
        foreach (var x in response.Hits)
        {
            hits.Add(new Document
            {
                Id = x.Source.Id,
                Location = x.Source.Location,
                Name = x.Source.Name,
                Rating = x.Source.Rating
            });
        }

        return hits;
    }
    
    private double GetBoostValue(string query)
    {
        queryBoostPairs.TryGetValue(query, out double boostValue);
        return boostValue;
    }
}