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

namespace HealthForm.Web.Controllers
{
    [Authorize]
    public class Clients1Controller : ApiController
    {

        private Service<Client> _Service;


        
        public Clients1Controller()
        {
            _Service = new Service<Client>();
        }

        [HttpGet]
        public IQueryable<Client> List()
        {
            //System.Threading.Thread.Sleep(2000);
            return _Service.Repository.GetAll();
        }

        [HttpGet]
        [ResponseType(typeof(Client))]
        public IHttpActionResult Details(int id)
        {
            
            return Ok(_Service.Repository.GetById(id));
        }

       
        
        //[ResponseType(typeof(Client))]
        public IHttpActionResult Maintain(Client poco)
        {
            System.Threading.Thread.Sleep(4000);
            return Ok(_Service.Save(poco));

        }

        // DELETE: api/Clients1/5
        [ResponseType(typeof(Client))]
        public IHttpActionResult DeleteClient(int id)
        {
            return Ok(_Service.Delete(id));
        }


        [HttpGet]
        public IQueryable<Client> Search(string filter)
        {
            return _Service.Repository.FindBy(x => x.ClientName.ToLower().Contains(filter.Trim().ToLower()));
        }

    }
}