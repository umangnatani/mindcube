using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EntLib
{
    public interface IDbFactory : IDisposable
    {
        DbContext Init();
    }
}
