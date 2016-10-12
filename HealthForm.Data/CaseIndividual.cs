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
    
    public partial class CaseIndividual
    {
        public int Id { get; set; }
        public int IndividualId { get; set; }
        public int ObjectId { get; set; }
        public string ObjectType { get; set; }
        public bool IsInactive { get; set; }
        public Nullable<int> EntBy { get; set; }
        public System.DateTime EntDt { get; set; }
        public Nullable<int> ChgBy { get; set; }
        public Nullable<System.DateTime> ChgDt { get; set; }
        public Nullable<bool> IsComplainant { get; set; }
        public Nullable<bool> IsWB { get; set; }
        public string WBComments { get; set; }
        public Nullable<bool> IsSubjectResponse { get; set; }
        public Nullable<System.DateTime> DraftSentDt { get; set; }
        public Nullable<System.DateTime> ResponseDueDt { get; set; }
        public Nullable<bool> RequestedExtension { get; set; }
        public Nullable<System.DateTime> ExtensionDueDt { get; set; }
        public Nullable<System.DateTime> ResponseReceiveDt { get; set; }
        public Nullable<bool> IsJudicialAction { get; set; }
        public Nullable<int> ReferralStatusId { get; set; }
        public Nullable<bool> IsLEA { get; set; }
        public Nullable<System.DateTime> LEADt { get; set; }
        public string LEAgency { get; set; }
        public Nullable<bool> IsSA { get; set; }
        public Nullable<System.DateTime> SADt { get; set; }
        public Nullable<System.DateTime> SAResponseDt { get; set; }
        public Nullable<bool> IsSAProsecuting { get; set; }
        public Nullable<bool> IsGrandJury { get; set; }
        public Nullable<bool> IsIndicted { get; set; }
        public Nullable<System.DateTime> AcceptanceDt { get; set; }
        public string RestAmount { get; set; }
        public Nullable<bool> IsPTI { get; set; }
        public Nullable<int> ProbTermId { get; set; }
        public string ProbTerm { get; set; }
        public string CommServiceHours { get; set; }
        public string SpecialConditions { get; set; }
    
        public virtual Individual Individual { get; set; }
    }
}
