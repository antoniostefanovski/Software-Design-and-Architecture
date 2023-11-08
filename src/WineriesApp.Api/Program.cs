using CsvHelper.Configuration;
using System.Globalization;
using Wineries.DataContext;
using WineriesApp.Api.Infrastructure.Startup;
using WineriesApp.Services.Filters;
using WineriesApp.Services.Pipes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureDbContext(builder.Environment, builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.Services.ApplyMigrations();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
