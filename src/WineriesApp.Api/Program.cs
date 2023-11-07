using CsvHelper.Configuration;
using System.Globalization;
using WineriesApp.Services.Filters;
using WineriesApp.Services.Pipes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var pipe = new Pipe<string>();
pipe.AddFilter(new WebsiteFilter());
pipe.AddFilter(new CoordinatesFilter());
pipe.AddFilter(new PhoneFormatFilter());

using (var reader = new StreamReader("Resources/data_wineries.csv"))
{
    reader.ReadLine(); // Skip Headers

    var line = pipe.RunFilters(reader.ReadLine() ?? string.Empty);

    Console.WriteLine(line);

    //while (line != null)
    //{
    //    line = pipe.RunFilters(line);
    //}
}

app.Run();
