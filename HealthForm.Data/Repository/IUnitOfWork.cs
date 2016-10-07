using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthForm.BL
{
    public interface IUnitOfWork
    {
        Task<int> Commit();
    }
}
