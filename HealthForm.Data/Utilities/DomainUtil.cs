using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthForm.Data
{
    public static class DomainUtil
    {
        public static void setAuditParams(object obj)
        {
            Type t = obj.GetType();


            if ((int)t.GetProperty("Id").GetValue(obj) > 0)
            {
                t.GetProperty("ChgDt").SetValue(obj, DateTime.Now, null);
                //    poco.ChgDt = DateTime.Now;
                //    //poco.ChgBy = SessionHandler.UserInfo.Id;

            }
            else
            {
                t.GetProperty("EntDt").SetValue(obj, DateTime.Now, null);
                //    poco.EntDt = DateTime.Now;
                //    //poco.EntBy = SessionHandler.UserInfo.Id;
            }
        }

        

    }
}
