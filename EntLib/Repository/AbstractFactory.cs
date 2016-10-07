using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EntLib
{
    public class AbstractFactory
    {
        private DbContext _conext;
        private IUnitOfWork _uow;

        public AbstractFactory(DbContext context)
        {
            _conext = context;
        }

        public IUnitOfWork UnitOfWork
        {
            get { return _uow ?? (_uow = new UnitOfWork(_conext)); }
        }

        public IEntityBaseRepository<T> Repository<T>() where T : class, IEntityBase, new()
        {
            return new EntityBaseRepository<T>(_conext);
        }
    }
}
