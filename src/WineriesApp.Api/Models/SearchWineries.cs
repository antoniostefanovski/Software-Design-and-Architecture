using System.ComponentModel.DataAnnotations;

namespace WineriesApp.Api.Models;

public class SearchWineries
{
    public string SearchTerm;

    [Required]
    public double[] Ratings = Array.Empty<double>();
}