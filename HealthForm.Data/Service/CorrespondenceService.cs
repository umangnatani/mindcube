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

            RetrunType rt = UoW.Save(poco);

            foreach (var item in poco.CasePrograms)
            {
                item.ObjectId = poco.Id;
                getRepository<CaseProgram>().Maintain(item);
            }

            UoW.Commit();

            return rt;
        }


        public Correspondence GetById(int id)
        {
            var model = Repository.GetById(id);

            model.CasePrograms = getRepository<CaseProgram>().FindBy(x => x.ObjectId == model.Id && x.ObjectType == "csp").ToList();

            return model;
        }

    }
}
