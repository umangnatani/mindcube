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

        private UserService _Service;

        public UsersController()
        {
            _Service = new UserService();
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
            var user = _Service.validateUser(poco.UserId, poco.Password);

            

            if ( user != null)
            {
                user = _Service.Repository.FindBy(x => x.Id == user.Id).Include("UserRoles.Role").SingleOrDefault();
                SessionHandler.UserInfo = user;
            }


            return Ok(user);
        }


    }
}
