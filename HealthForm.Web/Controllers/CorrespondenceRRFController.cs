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
    public class CorrespondenceRRFController : ApiController
    {
        private Service<CorrespondenceRRF> _Service;



        public CorrespondenceRRFController()
        {
            _Service = new Service<CorrespondenceRRF>();
        }

        [HttpPost]
        public IQueryable<CorrespondenceRRF> List(EntityObject poco)
        {
            return _Service.Repository.FindBy(x => x.CorrespId == poco.ObjectId);
        }

        [HttpPost]
        public IHttpActionResult Maintain(CorrespondenceRRF poco)
        {
            poco.EntDt = DateTime.Now;
            return Ok(_Service.Save(poco));
        }


    }
}
