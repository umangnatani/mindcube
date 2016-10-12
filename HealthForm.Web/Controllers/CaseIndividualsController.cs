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
    public class CaseIndividualsController : ApiController
    {
        private CaseIndividualService _Service;


        public CaseIndividualsController()
        {
            _Service = new CaseIndividualService();
        }


        [HttpPost]
        public IQueryable<CaseIndividual> List(EntityObject poco)
        {
            return _Service.Repository.FindBy(x => x.ObjectId == poco.ObjectId && x.ObjectType == poco.ObjectType).Include("Individual") ;
        }

        public IHttpActionResult Maintain(CaseIndividual poco)
        {
            return Ok(_Service.Maintain(poco));

        }
    }
}
