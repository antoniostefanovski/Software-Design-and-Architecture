﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WineriesApp.Common.Filters;
using WineriesApp.Common.Pipes;
using WineriesApp.DataContext.Models;

namespace WineriesApp.DataContext.Helpers
{
    public static class MapDataHelper
    {
        public static IEnumerable<Winery> GetWineries()
        {
            var wineries = new List<Winery>();
            var pipe = new Pipe<string>();

            pipe.AddFilter(new WebsiteFilter());
            pipe.AddFilter(new CoordinatesFilter());
            pipe.AddFilter(new PhoneFormatFilter());
            pipe.AddFilter(new DescriptionFilter());

            using (var reader = new StreamReader("Resources/data_wineries.csv"))
            {
                reader.ReadLine(); // Skip Headers
                
                var line = reader.ReadLine();

                while (line != null)
                {
                    line = pipe.RunFilters(line ?? string.Empty);

                    var fields = line.Split(',');
                    fields = fields.Select(f => f.Replace("$", ",")).ToArray();

                    var winery = new Winery
                    {
                        Name = fields[0]
                    };

                    if (float.TryParse(fields[1], NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out var latitude))
                    {
                        winery.Latitude = latitude;
                    }

                    if (float.TryParse(fields[2], NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out var longitude))
                    {
                        winery.Longitude = longitude;
                    }

                    winery.Address = fields[3];
                    winery.PhoneNumber = fields[4];
                    
                    if (double.TryParse(fields[5], NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out var rating))
                    {
                        winery.Rating = rating;
                    }

                    winery.Website = fields[6];
                    winery.Municipality = fields[7];
                    winery.ImageUrl = fields[8];
                    winery.Description = fields[9];

                    wineries.Add(winery);

                    line = reader.ReadLine();
                }
            }

            return wineries;
        }
    }
}
