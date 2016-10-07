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
    public class UtilController : ApiController
    {
        private CommonService _Service;



        public UtilController()
        {
            _Service = new CommonService();
        }

        [HttpPost]
        public IHttpActionResult Delete(EntityObject poco)
        {
            return Ok(_Service.Delete(poco));
        }
    }
}
