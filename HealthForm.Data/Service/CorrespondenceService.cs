using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{
    public class CorrespondenceService: Service<Correspondence>
    {

        public RetrunType SaveCorresp(Correspondence poco)
        {
            poco.ClientId = 6;
            Repository.Maintain(poco);
            return UoW.Save(poco);
        }
    }
}
