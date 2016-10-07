using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HealthForm.BL
{
    public interface IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {
        IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);
        IQueryable<T> All { get; }
        IQueryable<T> GetAll();
        Task<T> GetSingle(int id);
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);

        void Maintain(T entity);
        void Add(T entity);
        void Delete(T entity);
        void Edit(T entity);
    }
}
