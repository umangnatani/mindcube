using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntLib
{
    public interface IEntityBase
    {
        int Id { get; set; }
        //string EncId { get; set; }
        //DateTime EntDt { get; set; }
    }


    //public abstract class EntityBase: IEntityBase
    //{
    //    private string _EncId;
    //    public virtual int Id { get; set; }
    //    public virtual string EncId
    //    {
    //        get { return UtilSecurity.Encrypt(Id); }
    //        set { _EncId = value; }


    //    }

    //    public DateTime EntDt { get; set; }

    //}

    //public abstract class EntityBaseH : EntityBase
    //{
    //    public int? ParentId { get; set; }
    //}


}
