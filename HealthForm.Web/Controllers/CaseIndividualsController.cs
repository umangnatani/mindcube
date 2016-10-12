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
    public class CaseIndividualsController : ApiController
    {
        private Service<CaseIndividual> _Service;


        public CaseIndividualsController()
        {
            _Service = new Service<CaseIndividual>();
        }

        public IHttpActionResult Maintain(CaseIndividual poco)
        {
            DomainUtil.setAuditParams(poco);
            DomainUtil.setAuditParams(poco.Individual);
            //System.Threading.Thread.Sleep(4000);
            return Ok(_Service.Save(poco));

        }
    }
}
