using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntLib
{
    public class RetrunType
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public IEntityBase Object { get; set; }

        public RetrunType()
        {
            Message = "Process completed successfully";
        }
    }

    public class EntityObject
    {
        public int ObjectId { get; set; }
        public string ObjectType { get; set; }
    }
}
