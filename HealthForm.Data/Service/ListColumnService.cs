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
    public class ListColumnService : EntityService<ListColumn>, IListColumnService
    {
        private IEntityBaseRepository<ListColumnOption> _columnRep;
        private IEntityBaseRepository<ListColumnValue> _valueRep;

        public ListColumnService(IEntityBaseRepository<ListColumn> Repository, IUnitOfWork unitOfWork, IEntityBaseRepository<ListColumnOption> ColumnRepository, IEntityBaseRepository<ListColumnValue> ValueRep) : base(Repository, unitOfWork)
        {
            _columnRep = ColumnRepository;
            _valueRep = ValueRep;
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
                _Repository.Add(poco);


            RetrunType rt = new RetrunType();
            try
            {
                _unitOfWork.Commit();
                rt.Code = poco.Id;
                rt.Object = poco;
            }
            catch (Exception e)
            {
                rt.Code = 0;
                rt.Message = e.Message;
            }

            return rt;




            //if (ListId > 0) {

            //    _ChildService.SaveWithOptions(oldList, poco.ListColumnOptions);
            //}
        }

    }
}
