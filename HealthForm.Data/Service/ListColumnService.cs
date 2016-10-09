using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{
    public class ListColumnService : Service<ListColumn>
    {
        private IEntityBaseRepository<ListColumnOption> _columnRep;
        private IEntityBaseRepository<ListColumnValue> _valueRep;

        public ListColumnService()
        {
            _columnRep = getRepository<ListColumnOption>() ;
            _valueRep = getRepository<ListColumnValue>();
        }

        

        public IQueryable<ListColumnValue> getValues(int ListId, int ObjectId)
        {
            //var list = from lv in _valueRep.FindBy(x => x.ObjectId == ObjectId)
            //              join lc in _Repository.FindBy(x => x.ListId == ListId)
            //              on lv.ListColumnId equals lc.Id
                          
            //              select lv;

            var list = _valueRep.FindBy(x => x.ObjectId == ObjectId).Where(y => y.ListColumn.ListId == ListId);

            //var sql = list.ToString();
            return list.Include("ListColumn");

        }


        public RetrunType SaveWithOptions(ListColumn poco)
        {

            if (poco.Id > 0)
            {
                _columnRep.updateChildren(_Repository.Update(poco).ListColumnOptions.ToList(), poco.ListColumnOptions.ToList());

            }
            else
                Repository.Add(poco);



            return this.UoW.Save(poco);


        }

    }
}
