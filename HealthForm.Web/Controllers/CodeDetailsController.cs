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
        private IEntityService<CodeDetail> _Service;


        public CodeDetailsController(IEntityService<CodeDetail> Service)
        {
            _Service = Service;
        }

        [HttpGet]
        public IQueryable<CodeDetail> List(string id)
        {
            var items = _Service.FindBy(x => x.MasterCode == id).ToList();
            return _Service.FindBy(x => x.MasterCode == id);
            //return _Service.GetAll();
        }

        [HttpGet]
        [ResponseType(typeof(CodeDetail))]
        public IHttpActionResult Details(int id)
        {

            return Ok(_Service.GetById(id));
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


        [HttpGet]
        public IQueryable<CodeDetail> Search(string filter)
        {
            return _Service.FindBy(x => x.Code.ToLower().Contains(filter.Trim().ToLower()));
        }

    }
}
