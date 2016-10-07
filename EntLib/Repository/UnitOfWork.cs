using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using System.Threading.Tasks;

namespace EntLib
{
    public class UnitOfWork : IUnitOfWork
    {
        private DbContext dbContext;

        public UnitOfWork(DbContext _dbContext)
        {
            this.dbContext = _dbContext;
        }

        public DbContext DbContext
        {
            get { return dbContext ; }
        }

        public int Commit()
        {

            return DbContext.SaveChanges();

        }


        public RetrunType Save(IEntityBase Entity, string Action="")
        {
            RetrunType rt = new RetrunType { Code = 1, Object= (Action=="D")? null: Entity};
            try
            {
                Commit();
            }
            catch (Exception e)
            {
                rt.Code = 0;
                rt.Message = e.Message;
            }
            return rt;
        }

        public RetrunType Save(int Id)
        {
            RetrunType rt = new RetrunType { Code = Id };
            try
            {
                Commit();
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