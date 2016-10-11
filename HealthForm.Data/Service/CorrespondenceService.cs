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
            poco.ClientId = SessionHandler.UserInfo.ClientId.ToInt();

            var newChildren = poco.CasePrograms.ToList();

            newChildren.RemoveAll(x => x.ProgramId == 0);

            poco.ReceivedDt = poco.strReceivedDate.ToDateTime();

            Repository.Maintain(poco);

            RetrunType rt = UoW.Save(poco);


            var oldChildren = programRep.FindBy(x => x.ObjectId == poco.Id && x.ObjectType == "csp").ToList();

            programRep.updateChildren(oldChildren, newChildren);

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
