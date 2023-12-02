using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WineriesApp.DataContext.Helpers
{
    public static class DbContextHelper
    {
        public static WineriesDbContext GetDbContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<WineriesDbContext>();
            optionsBuilder.UseSqlServer("user id=sa;password=Wineries123$!;data source=DESKTOP-B4KHVLP;initial catalog=wineries-dev-db;Connect Timeout=30;Pooling=true;TrustServerCertificate=true");
            return new WineriesDbContext(optionsBuilder.Options);
        }
    }
}
