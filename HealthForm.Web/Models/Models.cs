using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HealthForm.Data;
using EntLib;

namespace HealthForm.Web
{
    public class MenuVM
    {
        public List<UserMenu> UserMenu { get; set; }
        public List<UserMenu> UserMenuTree { get; set; }
    }
}
