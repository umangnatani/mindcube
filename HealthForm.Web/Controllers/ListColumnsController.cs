using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HealthForm.Data;
using EntLib;
using System.Web.Http.Description;
using System.Threading;

namespace HealthForm.Web.Controllers
{
    public class ListColumnsController : ApiController
    {
        private ListColumnService _Service;

        public ListColumnsController()
        {
            _Service = new ListColumnService();
        }


        [HttpGet]
        public IQueryable<ListColumn> List(int id)
        {
            return _Service.Repository.FindBy(x => x.ListId == id, "ListColumnOptions");
        }


        [HttpGet]
        [ResponseType(typeof(ListColumn))]
        public IHttpActionResult Details(int id)
        {

            return Ok(_Service.Repository.GetById(id));
        }


        //[ResponseType(typeof(List))]
        [HttpPost]
        public IHttpActionResult Maintain(ListColumn poco)
        {
            //int milliseconds = 3000;
            //Thread.Sleep(milliseconds);
            //var ListId = poco.Id;

            //List<ListColumnOption> oldList = new List<ListColumnOption>();

            //if (ListId > 0)
            //{
            //    oldList = _Service.GetById(ListId).ListColumnOptions.ToList();
            //}

            

            RetrunType rt = _Service.SaveWithOptions(poco);


            //if (ListId > 0) {s

            //    _ChildService.SaveWithOptions(oldList, poco.ListColumnOptions);
            //}

            return Ok(rt);
        }

        // DELETE: api/Lists/5
        [ResponseType(typeof(ListColumn))]
        public IHttpActionResult DeleteList(int id)
        {
            return Ok(_Service.Delete(id));
        }


    }
}
