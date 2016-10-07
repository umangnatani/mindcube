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

    public class ListColumnValuesController : ApiController
    {

        private IListColumnService _Service;
        public ListColumnValuesController(IListColumnService Service)
        {
            _Service = Service;
        }


        [HttpGet]
        public IQueryable<ListColumnValue> List(int ListId, int ObjectId)
        {
            return _Service.getValues(ListId, ObjectId);
        }

    }
}
