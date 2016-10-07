using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EntLib
{
    public class DbFactory : Disposable, IDbFactory
    {
        DbContext dbContext;

        public DbFactory(DbContext context)
        {
            dbContext = context;
        }

        public DbContext Init()
        {
            return dbContext;
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
