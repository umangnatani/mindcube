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
    public class PatientInfoController : ApiController
    {
        private IEntityService<PatientInfo> _Service;
        public PatientInfoController(IEntityService<PatientInfo> Service)
        {
            _Service = Service;
        }


        [HttpPost]
        public IHttpActionResult Maintain(PatientInfo poco)
        {
            //ListValue poco = new ListValue { ListId = 3, ObjectId = 2, ObjectCode = "CT", JSONText = po.JSONText };

            RetrunType rt = _Service.Save(poco);

            return Ok(rt);
        }
    }
}
