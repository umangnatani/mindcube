using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{
    public class CommonService
    {
        public RetrunType Delete(EntityObject poco)
        {
            switch (poco.ObjectType) {
                case "csp":
                    {
                        return new CorrespondenceService().Delete(poco.ObjectId);
                    }
                case "comments":
                    {
                        return new Service<Comment>().Delete(poco.ObjectId);
                    }
                case "client":
                    {
                        return new Service<Client>().Delete(poco.ObjectId);
                    }
                default:
                    return new RetrunType();

            }
                
           
        }

    }
}
