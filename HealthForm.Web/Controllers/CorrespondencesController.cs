using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HealthForm.Data;
using EntLib;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq.Expressions;

namespace HealthForm.Web.Controllers
{
    public class CorrespondencesController : ApiController
    {
        private CorrespondenceService _Service;
        public CorrespondencesController()
        {
            _Service = new CorrespondenceService();
        }

        [HttpGet]
        public IQueryable<Correspondence> List()
        {
            //System.Threading.Thread.Sleep(2000);
            return _Service.Repository.GetAll();
        }

        [HttpPost]
        public IHttpActionResult Maintain(Correspondence poco)
        {
            
            return Ok(_Service.SaveCorresp(poco));
        }

        [HttpGet]
        public IHttpActionResult Details(int id)
        {

            return Ok(_Service.GetById(id));
        }


    }
}
