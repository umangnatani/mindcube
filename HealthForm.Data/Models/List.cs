using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{
    //this.Configuration.ProxyCreationEnabled = false;

    public partial class Correspondence : IEntityBase
    {

    }

    public partial class List : IEntityBase
    {

    }

    public partial class ListColumn : IEntityBase
    {
    }
    public partial class ListColumnOption : IEntityBase
    {
    }

    public partial class ListColumnValue : IEntityBase
    {
    }

    public partial class ListValue : IEntityBase
    {
    }

    public partial class UserMenu : IEntityBase
    {
        public List<UserMenu> Children { get; set; }
    }


}
