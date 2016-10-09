using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;
using System.Data.Entity;

namespace HealthForm.Data
{
    public class UserService: Service<User>
    {


        public User validateUser(string UserId, string Password)
        {

            var user = Repository.FindBy(x => x.UserId == UserId).SingleOrDefault();

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
