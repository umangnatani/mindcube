using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace EntLib
{
    public class EntityService<T> : IEntityService<T>
        where T : class, IEntityBase, new()
    {

        protected IEntityBaseRepository<T> _Repository;
        protected IUnitOfWork _unitOfWork;

        public EntityService()
        {

        }

        public EntityService(IEntityBaseRepository<T> Repository, IUnitOfWork unitOfWork)
        {
            _Repository = Repository;
            _unitOfWork = unitOfWork;
        }

        public virtual IQueryable<T> GetAll()
        {
            return _Repository.GetAll();
        }

        public T GetById(int id)
        {
            return _Repository.GetById(id);
        }



        public virtual IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, params string[] includeProperties)
        {
            return _Repository.FindBy(predicate, includeProperties);
        }

        public virtual IQueryable<T> AllIncluding(params string[] AllIncluding)
        {
            return _Repository.AllIncluding(AllIncluding);
        }


        public RetrunType Save(T entity)
        {
            _Repository.Maintain(entity);
            RetrunType rt = new RetrunType();
            try
            {
                _unitOfWork.Commit();
                rt.Code = entity.Id;
            }
            catch (Exception e)
            {
                rt.Code = 0;
                rt.Message = e.Message;
            }
            return rt;

            
        }


        public void Add(T entity)
        {
            _Repository.Add(entity);
            _unitOfWork.Commit();
        }


        public void Edit(T entity)
        {
            _Repository.Edit(entity);
            _unitOfWork.Commit();
        }



        public RetrunType Delete(int id)
        {
            return Delete( _Repository.GetById(id));

        }

        public RetrunType Delete(T entity)
        {
            _Repository.Delete(entity);

            RetrunType rt = new RetrunType { Code = entity.Id };
            try
            {
                _unitOfWork.Commit();
            }
            catch (Exception e)
            {
                rt.Code = 0;
                rt.Message = e.Message;
            }
            return rt;


        }





    }
}
