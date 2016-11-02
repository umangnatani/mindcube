using System;
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
        private string _strCommentDt;

        public string ByUser { get; set; }

        public string strCommentDt
        {
            get
            {
                return Util.ToDateString(_strCommentDt, CommentDt);
            }
            set
            {
                _strCommentDt = value;
            }
        }

    }

    public partial class Correspondence : IEntityBase
    {
        private string _strReceivedDt;
        private string _strAssignedDt;
        private string _strReviewDt;
        private string _strDueDt;

        public string strReceivedDt
        {
            get {
                return Util.ToDateString(_strReceivedDt, ReceivedDt);
            }
            set{
                _strReceivedDt = value;
            }
        }

        public string strAssignedDt
        {
            get
            {
                return Util.ToDateString(_strAssignedDt, AssignedDt);
            }
            set
            {
                _strAssignedDt = value;
            }
        }

        public string strReviewDt
        {
            get
            {
                return Util.ToDateString(_strReviewDt, ReviewDt);
            }
            set
            {
                _strReviewDt = value;
            }
        }

        public string strDueDt
        {
            get
            {
                return Util.ToDateString(_strDueDt, DueDt);
            }
            set
            {
                _strDueDt = value;
            }
        }


        public string ReceivedFrom
        {
            get
            {
                return Util.FormatName(FirstName, LastName, MiddleName);
            }

        }

        public ICollection<CaseProgram> CasePrograms { get; set; }
        public ICollection<AssignedTo> Assignees { get; set; }
        public ICollection<User> Reviewers { get; set; }


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

    public partial class AssignedTo : IEntityBase
    {

    }

    public partial class CaseIndividual : IEntityBase
    {

    }

    public partial class CaseAllegation : IEntityBase
    {
        public string AllegationDetail { get; set; }
        public string AllegationType { get; set; }
        public int AllegationTypeId { get; set; }
    }
}
