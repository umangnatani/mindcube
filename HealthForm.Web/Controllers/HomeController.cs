using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HealthForm.Data;
using EntLib;

namespace HealthForm.Web.Controllers
{
    public class HomeController : Controller
    {
        private Service<UserMenu> _Service;

        public ActionResult Index()
        {
            _Service = new Service<UserMenu>();

            var items = _Service.Repository.GetAll();

            Action<UserMenu> SetChildren = null;


            SetChildren = parent =>
            {
                parent.Children = items
                    .Where(childItem => childItem.ParentId == parent.Id)
                    .ToList();

                //Recursively call the SetChildren method for each child.
                parent.Children
                    .ForEach(SetChildren);
            };

            //Initialize the hierarchical list to root level items
            List<UserMenu> hierarchicalItems = items
                .Where(rootItem => rootItem.ParentId == null)
                .ToList();

            //Call the SetChildren method to set the children on each root level item.
            hierarchicalItems.ForEach(SetChildren);

            //return hierarchicalItems;


            return View(hierarchicalItems);
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
