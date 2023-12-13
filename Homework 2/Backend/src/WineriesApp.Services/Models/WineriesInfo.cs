namespace WineriesApp.Services.Models
{
    public class WineriesInfo : BaseWineryInfo
    {
        public string Address { get; set; } = string.Empty;

        public string Contact { get; set; } = string.Empty;

        public string Url { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        public float Latitude { get; set; }

        public float Longitude { get; set; }
    }
}
