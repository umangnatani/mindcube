﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;

namespace HealthForm.Data
{

    public partial class Entity : IEntityBase
    {

    }

    public partial class Individual : IEntityBase
    {

    }

    public partial class Comment : IEntityBase
    {

    }

    public partial class Correspondence : IEntityBase
    {
        private string _strReceivedDate;

        public string strReceivedDate
        {
            get {
                return string.IsNullOrEmpty(_strReceivedDate) ? ReceivedDt.Value.ToShortDateString() : _strReceivedDate;
            }
            set{
                _strReceivedDate = value;
            }
        }
        public ICollection<CaseProgram> CasePrograms { get; set; }
    }
    public partial class CorrespondenceRRF : IEntityBase
    {

    }

    public partial class Program : IEntityBase
    {
        public string formattedDesc
        {
            get
            {
                return Entity.Desc + " -- " + Desc;
            }
            //set
            //{
            //    _strReceivedDate = value;
            //}
        }
    }

    public partial class CaseProgram : IEntityBase
    {

    }

    public partial class CaseIndividual : IEntityBase
    {

    }
}
