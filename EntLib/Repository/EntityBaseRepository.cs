using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Text;
using System.Threading.Tasks;

namespace EntLib
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T>
        where T : class, IEntityBase, new()
    {

        private DbContext dataContext;

        #region Properties

        protected DbContext DbContext
        {
            get { return dataContext; }
        }
        public EntityBaseRepository(DbContext _dbContext)
        {
            dataContext = _dbContext;
        }
        #endregion
        public virtual IQueryable<T> GetAll()
        {
            return DbContext.Set<T>();
        }
        public virtual IQueryable<T> All
        {
            get
            {
                return GetAll();
            }
        }
        public virtual IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = DbContext.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }


        public virtual IQueryable<T> AllIncluding(params string[] includeProperties)
        {
            return IncludeRelated(DbContext.Set<T>(), includeProperties);
        }

        private IQueryable<T> IncludeRelated(IQueryable<T> query, params string[] includeProperties)
        {
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public T GetById(int id)
        {
            return DbContext.Set<T>().Find(id);
            //return GetAll().FirstOrDefault(x => x.ID == id);
        }
        public virtual IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, params string[] includeProperties)
        {
            //DbContext.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);

             var list = DbContext.Set<T>().Where(predicate);
            //var sql = list.ToString();
            return IncludeRelated(list, includeProperties); 

        }





        public void updateChildren(List<T> oldChildren, List<T> newChildren)
        {
            var deletedChildren = oldChildren.Where(i => !newChildren.Any(i2=> i2.Id==i.Id));

            foreach (T child in deletedChildren)
            {
                Delete(child);
            }

            var addedChildren = newChildren.Where(i => !oldChildren.Any(i2 => i2.Id == i.Id));

            foreach (T child in addedChildren)
            {
                Add(child);
            }


            var modifiedChildren = newChildren.Where(i => !addedChildren.Any(i2 => i2.Id == i.Id));

            foreach (T child in modifiedChildren)
            {
                Update(child);
            }
        }



        public virtual void Maintain(T entity)
        {
            if (entity.Id > 0)
                Edit(entity);
            else
                Add(entity);
        }

        public virtual void Add(T entity)
        {
            //entity.EntDt = DateTime.Now;
            DbEntityEntry dbEntityEntry = DbContext.Entry<T>(entity);
            DbContext.Set<T>().Add(entity);
        }
        public virtual void Edit(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;

        }

        public virtual T Update(T entity)
        {

            var persistedEntity = GetById(entity.Id);
            var entry = DbContext.Entry(persistedEntity);
            entry.CurrentValues.SetValues(entity);

            return persistedEntity;

        }

        public virtual void Delete(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }

        public virtual void Delete(IQueryable<T> list)
        {
            DbContext.Set<T>().RemoveRange(list);
        }

    }
}
