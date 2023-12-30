using Microsoft.AspNetCore.Mvc;

namespace WineriesApp.Api.Controllers;

public class ErrorController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}