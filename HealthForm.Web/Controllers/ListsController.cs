using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using HealthForm.Data;
using EntLib;
using System.Web;
using System.Security.Claims;

namespace HealthForm.Web.Controllers
{
    public class ListsController : ApiController
    {
        private Service<List> _Service;

        public ListsController()
        {
            _Service = new Service<List>();
        }


        [Authorize]
        [HttpGet]
        public IQueryable<List> List()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;

            //var Name = ClaimsPrincipal.Current.Identity.Name ;
            //var Name1 = User.Identity.Name;

            return _Service.Repository.GetAll();
        }


        [HttpGet]
        [ResponseType(typeof(List))]
        public IHttpActionResult Details(int id)
        {

            return Ok(_Service.Repository.GetById(id));
        }


        //[ResponseType(typeof(List))]
        [HttpPost]
        public IHttpActionResult Maintain(List list)
        {
            return Ok(_Service.Save(list));
        }

        // DELETE: api/Lists/5
        [ResponseType(typeof(List))]
        public IHttpActionResult DeleteList(int id)
        {
            return Ok(_Service.Delete(id));
        }

       
    }
}