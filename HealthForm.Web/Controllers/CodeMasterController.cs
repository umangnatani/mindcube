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
    public class CodeMasterController : ApiController
    {
        private Service<CodeMaster> _Service;


        public CodeMasterController()
        {
            _Service = new Service<CodeMaster>();
        }

        [HttpGet]
        public IQueryable<CodeMaster> List()
        {
            //var items = _Service.FindBy(x => x.MasterCode == id).ToList();
            //return _Service.Repository.FindBy(x => x.MasterCode == id);
            return _Service.Repository.GetAll();
        }

        [HttpGet]
        [ResponseType(typeof(CodeMaster))]
        public IHttpActionResult Details(int id)
        {

            return Ok(_Service.Repository.GetById(id));
        }



        //[ResponseType(typeof(Client))]
        public IHttpActionResult Maintain(CodeMaster poco)
        {
            return Ok(_Service.Save(poco));

        }
    }
}
