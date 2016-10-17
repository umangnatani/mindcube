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
    public class CaseAllegationsController : ApiController
    {
        private Service<CaseAllegation> _Service;


        public CaseAllegationsController()
        {
            _Service = new Service<CaseAllegation>();
        }


        [HttpPost]
        public IEnumerable<CaseAllegation> List(EntityObject poco)
        {
            var query =
                       from alleg in _Service.Repository.FindBy(x => x.ObjectId == poco.ObjectId && x.ObjectType == poco.ObjectType)
                       join code in _Service.getRepository<CodeDetail>().GetAll() on alleg.AllegationId equals code.Id
                       join code2 in _Service.getRepository<CodeDetail>().GetAll() on code.Field1 equals code2.Id.ToString()

                       select new {alleg, AllegationDetail = code.Text, TypeId = code2.Id, Type = code2.Text};

            return query.ToList().Select(x => new CaseAllegation
            {
                AllegationId = x.alleg.AllegationId,
                AllegationDetail = x.AllegationDetail,
                AllegationTypeId = x.TypeId,
                AllegationType = x.Type,
                ObjectId = x.alleg.ObjectId,
                ObjectType = x.alleg.ObjectType,
                Id = x.alleg.Id,
                Desc = x.alleg.Desc,
                EntBy = x.alleg.EntBy,
                EntDt = x.alleg.EntDt,
                ChgBy = x.alleg.ChgBy,
                ChgDt = x.alleg.ChgDt
            });

            //return query;
        }

        public IHttpActionResult Maintain(CaseAllegation poco)
        {
            return Ok(_Service.Save(poco));

        }
    }
}
