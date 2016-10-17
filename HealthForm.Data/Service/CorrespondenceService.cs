using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq.Expressions;

namespace HealthForm.Data
{
    public class CorrespondenceService: Service<Correspondence>
    {

        private IEntityBaseRepository<CaseProgram> programRep;
        private IEntityBaseRepository<AssignedTo> assignRep;

        public CorrespondenceService()
        {
            programRep = getRepository<CaseProgram>();
            assignRep = getRepository<AssignedTo>();
        }


        public RetrunType SaveCorresp(Correspondence poco)
        {
            if (poco.Id == 0) { 
                poco.ClientId = SessionHandler.UserInfo.ClientId.ToInt();

                //poco.CustomId = 
            }

            var newPrograms = poco.CasePrograms.ToList();

            var newAssignees = poco.Assignees.ToList();

            newAssignees.Where(w => w.EntDt == DateTime.MinValue).ToList().ForEach(f => f.EntDt = DateTime.Now);

            newPrograms.RemoveAll(x => x.ProgramId == 0);

            poco.ReceivedDt = poco.strReceivedDate.ToDateTime();

            Save(poco);

            RetrunType rt = UoW.Save(poco);


            var oldPrograms = programRep.FindBy(x => x.ObjectId == poco.Id && x.ObjectType == "csp").ToList();

            var oldAssignees = assignRep.FindBy(x => x.ObjectId == poco.Id && x.ObjectType == "csp").ToList();

            programRep.updateChildren(oldPrograms, newPrograms);
            assignRep.updateChildren(oldAssignees, newAssignees);

            UoW.Commit();

            return rt;
        }


        public Correspondence GetById(int id)
        {
            var model = Repository.GetById(id);

            model.CasePrograms = programRep.FindBy(x => x.ObjectId == model.Id && x.ObjectType == "csp").Include("Program.Entity").ToList();

            model.Assignees = assignRep.FindBy(x => x.ObjectId == model.Id && x.ObjectType == "csp").Include("User").ToList();


            return model;
        }

    }
}
