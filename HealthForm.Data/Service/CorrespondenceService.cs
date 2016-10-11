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

        private IEntityBaseRepository<CaseProgram> programRep; 

        public CorrespondenceService()
        {
            programRep = getRepository<CaseProgram>();
        }


        public RetrunType SaveCorresp(Correspondence poco)
        {
            poco.ClientId = 6;

            poco.ReceivedDt = poco.strReceivedDate.ToDateTime();

            Repository.Maintain(poco);

            RetrunType rt = UoW.Save(poco);


            var oldChildren = programRep.FindBy(x => x.ObjectId == poco.Id && x.ObjectType == "csp").ToList();

            var deletedChildren = oldChildren.Where(i => !poco.CasePrograms.Any(i2 => i2.Id == i.Id));

            foreach (CaseProgram child in deletedChildren)
            {
                programRep.Delete(child);
            }


            var addedChildren = poco.CasePrograms.Where(i => !oldChildren.Any(i2 => i2.Id == i.Id));

            foreach (CaseProgram child in addedChildren)
            {
                programRep.Add(child);
            }


            var modifiedChildren = poco.CasePrograms.Where(i => !addedChildren.Any(i2 => i2.Id == i.Id));

            foreach (CaseProgram child in modifiedChildren)
            {
                programRep.Update(child);
            }

            //foreach (var item in poco.CasePrograms)
            //{
            //    item.ObjectId = poco.Id;
            //    programRep.Maintain(item);
            //}

            UoW.Commit();

            return rt;
        }


        public Correspondence GetById(int id)
        {
            var model = Repository.GetById(id);

            model.CasePrograms = programRep.FindBy(x => x.ObjectId == model.Id && x.ObjectType == "csp").ToList();

            return model;
        }

    }
}
