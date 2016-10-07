using EntLib;
using System.Linq;

namespace HealthForm.Data
{
    public interface IListColumnService: IEntityService<ListColumn>
    {
        RetrunType SaveWithOptions(ListColumn poco);
        IQueryable<ListColumnValue> getValues(int ListId, int ObjectId);
    }
}