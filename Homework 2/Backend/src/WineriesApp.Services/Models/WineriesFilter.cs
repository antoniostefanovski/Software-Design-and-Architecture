namespace WineriesApp.Services.Models;

public class WineriesFilter
{
    public string? SearchTerm { get; set; }
    
    public double[] Ratings { get; set; } = Array.Empty<double>();

    public string[] Locations { get; set; } = Array.Empty<string>();
}