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


        [HttpGet]
        public IQueryable<User> List()
        {
            return _Service.Repository.GetAll();
        }


        [HttpPost]
        public IHttpActionResult Maintain(HealthForm.Data.User poco)
        {
            if (poco.Id == 0)
            { 
                poco.Salt = Encrypt.CreateSalt();
                poco.HashedPassword = Encrypt.EncryptPassword(poco.Password , poco.Salt);
                poco.EntDt = DateTime.Now;
            }

            RetrunType rt = _Service.Save(poco);

            return Ok(rt);
        }



        [HttpPost]
        public IHttpActionResult Login(HealthForm.Data.User poco)
        {
            var user = _Service.validateUser(poco.UserName, poco.Password);

            

            if ( user != null)
            {
                user = _Service.Repository.FindBy(x => x.Id == user.Id).Include("UserRoles.Role").SingleOrDefault();
                SessionHandler.UserInfo = user;
            }


            return Ok(user);
        }


    }
}
