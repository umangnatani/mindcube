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
    
    public partial class ListColumnOption
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public Nullable<int> ListColumnId { get; set; }
        public bool IsInactive { get; set; }
    
        public virtual ListColumn ListColumn { get; set; }
    }
}
