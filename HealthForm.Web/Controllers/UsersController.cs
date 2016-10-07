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
    public class UsersController : ApiController
    {

        private IEntityService<User> _Service;
        public UsersController(IEntityService<User> Service)
        {
            _Service = Service;
        }


        [HttpPost]
        public IHttpActionResult Maintain(HealthForm.Data.User poco)
        {
            //User poco = new User { UserId = po.UserId, Password = po.Password, Email = po.Email };

            poco.Salt = Encrypt.CreateSalt();
            poco.HashedPassword = Encrypt.EncryptPassword(poco.Password , poco.Salt);
            poco.DateCreated = DateTime.Now;
            ////ListValue poco = new ListValue { ListId = 3, ObjectId = 2, ObjectCode = "CT", JSONText = po.JSONText };

            RetrunType rt = _Service.Save(poco);

            return Ok(rt);
        }


        [HttpPost]
        public IHttpActionResult Login(HealthForm.Data.User poco)
        {
            var user = _Service.FindBy(x => x.UserId == poco.UserId).Include("UserRoles.Role").SingleOrDefault();

            RetrunType rt = new RetrunType();

            if ( user != null)
            {
                if (string.Equals(Encrypt.EncryptPassword(poco.Password, user.Salt), user.HashedPassword)) {
                    SessionHandler.UserInfo = user;
                    rt.Code = 1;
                    rt.Message = "Worked";
                }
                else
                {
                    rt.Code = 0;
                    rt.Message = "Failed";
                }
            }


            return Ok(rt);
        }


    }
}
