//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HealthForm.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class AssignedTo
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ObjectId { get; set; }
        public string ObjectType { get; set; }
        public string Comments { get; set; }
        public string AssignType { get; set; }
        public bool IsInactive { get; set; }
        public Nullable<int> EntBy { get; set; }
        public System.DateTime EntDt { get; set; }
        public Nullable<int> ChgBy { get; set; }
        public Nullable<System.DateTime> ChgDt { get; set; }
    
        public virtual User User { get; set; }
    }
}
