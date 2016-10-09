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
        private ListColumnService _Service;

        public ListFormsController()
        {
            _Service = new ListColumnService();
        }
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public ActionResult List(int id)
        {
            return View(_Service.Repository.FindBy(x => x.ListId == id).ToList());
        }

    }
}