using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EntLib
{
    public interface IEntityService<T> where T : class, IEntityBase, new()
    {
        IQueryable<T> GetAll();
        T GetById(int id);

        IQueryable<T> AllIncluding(params string[] includeProperties);

        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, params string[] includeProperties);
        RetrunType Save(T entity);

        void Add(T entity);

        void Edit(T entity);

        RetrunType Delete(int id);
        RetrunType Delete(T entity);
    }
}
