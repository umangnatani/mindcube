using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{

    public partial class Entity : IEntityBase
    {

    }

    public partial class Individual : IEntityBase
    {

    }

    public partial class Comment : IEntityBase
    {

    }

    public partial class Correspondence : IEntityBase
    {
        public ICollection<CaseProgram> CasePrograms { get; set; }
    }
    public partial class CorrespondenceRRF : IEntityBase
    {

    }

    public partial class Program : IEntityBase
    {

    }

    public partial class CaseProgram : IEntityBase
    {

    }
}
