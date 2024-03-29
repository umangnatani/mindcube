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
    
    public partial class Program
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Program()
        {
            this.CasePrograms = new HashSet<CaseProgram>();
        }
    
        public int Id { get; set; }
        public string Desc { get; set; }
        public int EntityId { get; set; }
        public bool IsInactive { get; set; }
        public Nullable<int> EntBy { get; set; }
        public System.DateTime EntDt { get; set; }
        public Nullable<int> ChgBy { get; set; }
        public Nullable<System.DateTime> ChgDt { get; set; }
    
        public virtual Entity Entity { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseProgram> CasePrograms { get; set; }
    }
}
