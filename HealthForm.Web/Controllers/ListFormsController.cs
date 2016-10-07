using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EntLib;
using HealthForm.Data;

namespace HealthForm.Web.Controllers
{
    public class ListFormsController : Controller
    {
        private IListColumnService _Service;

        public ListFormsController(IListColumnService Service)
        {
            _Service = Service;
        }
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public ActionResult List(int id)
        {
            return View(_Service.FindBy(x => x.ListId == id).ToList());
        }

    }
}