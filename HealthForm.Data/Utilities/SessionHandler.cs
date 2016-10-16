using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HealthForm.Data
{
    public static class SessionHandler
    {
        private static void SetSession<T>(string sessionId, T value)
        {
            HttpContext.Current.Session[sessionId] = value;
        }

        private static T GetSession<T>(string sessionId)
        {
            return (T)HttpContext.Current.Session[sessionId];
        }

        public static string UserName
        {
            get
            {
                return GetSession<string>("UserName");
            }
            set
            {
                SetSession<string>("UserName", value);
            }
        }


        public static User UserInfo
        {
            get
            {
                return GetSession<User>("UserInfo");
            }
            set
            {
                SetSession<User>("UserInfo", value);
            }
        }

    }
}
