using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

namespace HealthForm.Data
{
    public static class DomainUtil
    {
        public static void setAuditParams(object obj)
        {
            Type t = obj.GetType();


            if ((int)t.GetProperty("Id").GetValue(obj) > 0)
            {
                PropertyInfo ChgDt = t.GetProperty("ChgDt");
                PropertyInfo ChgBy = t.GetProperty("ChgBy");
                PropertyInfo ClientId = t.GetProperty("ClientId");

                if (ChgDt != null)
                    ChgDt.SetValue(obj, DateTime.Now, null);
                if (ChgBy != null)
                    ChgBy.SetValue(obj, SessionHandler.UserInfo.Id, null);

                if (ClientId != null)
                    ClientId.SetValue(obj, SessionHandler.UserInfo.ClientId, null);

            }
            else
            {
                PropertyInfo EntDt = t.GetProperty("EntDt");
                PropertyInfo EntBy = t.GetProperty("EntBy");
                if (EntDt != null)
                    EntDt.SetValue(obj, DateTime.Now, null);
                if (EntBy != null)
                    EntBy.SetValue(obj, SessionHandler.UserInfo.Id, null);
            }
        }

        

    }
}
