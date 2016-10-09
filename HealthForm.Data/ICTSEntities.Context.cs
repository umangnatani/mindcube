﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ICTSEntities : DbContext
    {
        public ICTSEntities()
            : base("name=ICTSEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<CodeDetail> CodeDetails { get; set; }
        public virtual DbSet<CodeMaster> CodeMasters { get; set; }
        public virtual DbSet<Entity> Entities { get; set; }
        public virtual DbSet<List> Lists { get; set; }
        public virtual DbSet<ListColumn> ListColumns { get; set; }
        public virtual DbSet<ListColumnOption> ListColumnOptions { get; set; }
        public virtual DbSet<ListColumnValue> ListColumnValues { get; set; }
        public virtual DbSet<ListValue> ListValues { get; set; }
        public virtual DbSet<PatientInfo> PatientInfoes { get; set; }
        public virtual DbSet<Program> Programs { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserMenu> UserMenus { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<CaseAllegation> CaseAllegations { get; set; }
        public virtual DbSet<CaseAllegationsSubject> CaseAllegationsSubjects { get; set; }
        public virtual DbSet<CaseIndividual> CaseIndividuals { get; set; }
        public virtual DbSet<CorrespondenceRRF> CorrespondenceRRFs { get; set; }
        public virtual DbSet<Individual> Individuals { get; set; }
        public virtual DbSet<Correspondence> Correspondences { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<CaseProgram> CasePrograms { get; set; }
    }
}
