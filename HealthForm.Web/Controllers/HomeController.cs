using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HealthForm.Data;

namespace HealthForm.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Test()
        {
            SessionHandler.UserId = "test";
            return View();
        }
    }
}
