using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{
    public partial class Client : IEntityBase
    {
        
    }

    public partial class CodeDetail : IEntityBase
    {

    }

    public partial class PatientInfo : IEntityBase
    {

    }

    public partial class User : IEntityBase
    {
        public string Password { get; set; }
    }



}
