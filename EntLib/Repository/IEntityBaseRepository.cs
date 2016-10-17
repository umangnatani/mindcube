using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EntLib
{
    public interface IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {
        IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);

        IQueryable<T> AllIncluding(params string[] includeProperties);
        IQueryable<T> All { get; }
        IQueryable<T> GetAll();
        T GetById(int id);
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, params string[] includeProperties);

        //IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, string ChildProperty, string[] includeProperties);

        void Maintain(T entity);
        void Add(T entity);
        void Delete(T entity);

        void Delete(IQueryable<T> list);
        void Edit(T entity);

        T Update(T entity);

        void updateChildren(List<T> oldChildren, List<T> newChildren);
    }
}
