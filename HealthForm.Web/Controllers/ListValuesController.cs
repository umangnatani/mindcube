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
    public class test
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string JSONText { get; set; }
    }


    public class ListValuesController : ApiController
    {
        private IEntityService<ListValue> _Service;
        public ListValuesController(IEntityService<ListValue> Service)
        {
            _Service = Service;
        }


        [HttpGet]
        public ListValue List(int ListId, int ObjectId)
        {
            return _Service.FindBy(x => x.ListId == ListId && x.ObjectId == ObjectId).FirstOrDefault();
        }


        [HttpPost]
        public IHttpActionResult Maintain(test po)
        {
            ListValue poco = new ListValue { ListId = 3, ObjectId = 2, ObjectCode = "CT", JSONText = po.JSONText };

            RetrunType rt = _Service.Save(poco);

            return Ok();
        }

    }
}
