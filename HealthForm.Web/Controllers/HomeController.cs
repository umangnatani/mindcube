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

            MenuVM vm = new MenuVM();

            var menuItems = _Service.Repository.GetAll();

            vm.UserMenu = menuItems.Where(x=> !string.IsNullOrEmpty(x.StateName)).ToList();

            var items = menuItems.Where(x => !string.IsNullOrEmpty(x.Code));

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

            vm.UserMenuTree = hierarchicalItems;


            return View(vm);
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
