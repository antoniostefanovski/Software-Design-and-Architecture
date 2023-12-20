namespace WineriesApp.Services.Models.Filters
{
    public class WineriesFilter
    {
        public string? SearchTerm { get; set; }
    
        public double[] Ratings { get; set; } = Array.Empty<double>();

        public Guid[] Locations { get; set; } = Array.Empty<Guid>();
        
        public int? MaxEntries { get; set; }
    }
}