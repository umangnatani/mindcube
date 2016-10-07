using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;
using System.Data.Entity;

namespace HealthForm.Data
{
    public class Factory: AbstractFactory
    {
       
        public Factory(): base (new ICTSEntities())
        {
        }

        


    }
}
