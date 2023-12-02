namespace WineriesApp.Services.Models
{
    public class Winery
    {
        public string Name { get; set; } = string.Empty;

        public string Latitude { get; set; } = string.Empty;
        
        public string Longitude { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Contact { get; set; } = string.Empty;

        public double Rating { get; set; }

        public string Url { get; set; } = string.Empty;

        public string Municipality { get; set; } = string.Empty;

    }
}
