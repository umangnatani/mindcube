using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HealthForm.Data;
using EntLib;

namespace HealthForm.Web.Controllers
{
    public class ProgramsController : ApiController
    {
        private Service<Program> _Service;



        public ProgramsController()
        {
            _Service = new Service<Program>();
        }

        [HttpPost]
        public IQueryable<Program> List()
        {
            //System.Threading.Thread.Sleep(2000);
            return _Service.Repository.GetAll();
        }


    }
}
