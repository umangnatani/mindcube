using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntLib
{
    public interface IUnitOfWork
    {
        int Commit();
        RetrunType Save(int Id);

        RetrunType Save(IEntityBase Entity, string Action="");
    }
}
