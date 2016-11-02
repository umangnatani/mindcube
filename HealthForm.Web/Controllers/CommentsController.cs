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
    public class CommentsController : ApiController
    {
        private Service<Comment> _Service;



        public CommentsController()
        {
            _Service = new Service<Comment>();
        }


        [HttpPost]
        public IQueryable<Comment> List(EntityObject poco)
        {
            var list = _Service.Repository.FindBy(x => x.ObjectId == poco.ObjectId && x.ObjectType == poco.ObjectType);
            list.Where(w => w.EntBy != null).ToList().ForEach(f => f.ByUser =  _Service.getRepository<User>().GetById((int)f.EntBy).Name);
            return list;
        }

        [HttpPost]
        public IHttpActionResult Maintain(Comment poco)
        {
            poco.EntDt = DateTime.Now;
            poco.CommentDt = Convert.ToDateTime(poco.strCommentDt);
            return Ok(_Service.Save(poco));
        }

        [HttpPost]
        public IHttpActionResult DeleteRecord(int PrimaryId = 0)
        {
            return Ok(_Service.Delete(PrimaryId));
        }

    }
}
