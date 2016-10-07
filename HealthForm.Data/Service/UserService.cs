using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;
using System.Data.Entity;

namespace HealthForm.Data
{
    public class UserService
    {
        private IEntityService<User> _service;

        public UserService()
        {
            DbContext conext = new ICTSEntities();


            _service = new EntityService<User>(new EntityBaseRepository<User>(conext), new UnitOfWork(conext));
            
        }


        public User validateUser(string UserId, string Password)
        {

            var user = _service.FindBy(x => x.UserId == UserId).SingleOrDefault();

            bool validUser = false;

            if (user != null)
            {
                if (string.Equals(Encrypt.EncryptPassword(Password, user.Salt), user.HashedPassword))
                {
                    validUser = true;
                }
                else
                    user = null;


            }


            return user;

        }

    }
}
