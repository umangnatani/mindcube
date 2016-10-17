using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{
    public class Service<T> where T : class, IEntityBase, new()
    {
        private Factory _factory;
        protected IEntityBaseRepository<T> _Repository;
        public Service()
        {
            _factory = new Factory();
        }

        public IEntityBaseRepository<T> Repository
        {
            get { return _Repository = _factory.Repository<T>(); }
        }

        public IUnitOfWork UoW
        {
            get { return _factory.UnitOfWork; }
        }

        public IEntityBaseRepository<TBase> getRepository<TBase>() where TBase : class, IEntityBase, new()
        {
            return _factory.Repository<TBase>();
        }


        public RetrunType Save(T entity)
        {
            DomainUtil.setAuditParams(entity);
            Repository.Maintain(entity);
            return UoW.Save(entity);

        }

        public virtual RetrunType Delete(int id)
        {
            return Delete(Repository.GetById(id));

        }

        public RetrunType Delete(T entity)
        {
            Repository.Delete(entity);

            return UoW.Save(entity, "D");

       }


    }
}
