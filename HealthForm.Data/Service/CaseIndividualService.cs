using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{
    public class CaseIndividualService: Service<CaseIndividual>
    {
        private IEntityBaseRepository<Individual> indRep;

        public CaseIndividualService()
        {
            indRep = getRepository<Individual>();
        }

        public RetrunType Maintain(CaseIndividual poco)
        {
            DomainUtil.setAuditParams(poco);
            DomainUtil.setAuditParams(poco.Individual);
            //System.Threading.Thread.Sleep(4000);

            if(poco.Id > 0)
            {
                Repository.Update(poco);
                indRep.Update(poco.Individual);
                return UoW.Save(poco);
            }
            else
                return Save(poco);

        }


    }
}
