﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HealthForm.Data;
using EntLib;

namespace HealthForm.Web.Controllers
{
    public class UserMenuController : ApiController
    {

        private Service<UserMenu> _Service;
        public UserMenuController()
        {
            _Service = new Service<UserMenu>();
        }

        public IHttpActionResult Maintain(UserMenu poco)
        {
            //System.Threading.Thread.Sleep(4000);
            return Ok(_Service.Save(poco));

        }


        [HttpGet]
        public IQueryable<UserMenu> List()
        {
            //System.Threading.Thread.Sleep(2000);
            return _Service.Repository.GetAll();
        }


        [HttpGet]
        public List<UserMenu> ListTree()
        {
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
            hierarchicalItems.ForEach(SetChildren) ;

            return hierarchicalItems;
        }
    }
}
