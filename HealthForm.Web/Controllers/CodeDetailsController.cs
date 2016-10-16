using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using HealthForm.Data;
using EntLib;

namespace HealthForm.Web.Controllers
{
    public class CodeDetailsController : ApiController
    {
        private Service<CodeDetail> _Service;


        public CodeDetailsController()
        {
            _Service = new Service<CodeDetail>();
        }

        [HttpGet]
        public IQueryable<CodeDetail> List(string id)
        {
            //var items = _Service.FindBy(x => x.MasterCode == id).ToList();
            return _Service.Repository.FindBy(x => x.MasterCode == id);
            //return _Service.GetAll();
        }


        [HttpGet]
        public IQueryable<CodeDetail> List(string id, string field1)
        {
            //var items = _Service.FindBy(x => x.MasterCode == id).ToList();
            return _Service.Repository.FindBy(x => x.MasterCode == id && x.Field1 == field1);
            //return _Service.GetAll();
        }


        [HttpGet]
        [ResponseType(typeof(CodeDetail))]
        public IHttpActionResult Details(int id)
        {

            return Ok(_Service.Repository.GetById(id));
        }



        //[ResponseType(typeof(Client))]
        public IHttpActionResult Maintain(CodeDetail poco)
        {
            return Ok(_Service.Save(poco));

        }

        // DELETE: api/Clients1/5
        [ResponseType(typeof(CodeDetail))]
        public IHttpActionResult DeleteClient(int id)
        {
            return Ok(_Service.Delete(id));
        }



    }
}
