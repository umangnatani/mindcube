using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntLib;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace HealthForm.Data
{
    public static class Extensions
    {
        public static void SaveWithOptions(this IEntityService<ListColumnOption> service, IEnumerable<ListColumnOption> oldChildren, IEnumerable<ListColumnOption> newChildren)
        {
            var deletedChildren = oldChildren.Except(newChildren);

            foreach (ListColumnOption child in deletedChildren){
                service.Delete(child);
            }

            var addedChildren = newChildren.Except(oldChildren);

            foreach (ListColumnOption child in addedChildren)
            {
                service.Add(child);
            }


            var modifiedChildren = newChildren.Except(addedChildren);

            foreach (ListColumnOption child in modifiedChildren)
            {
                service.Edit(child);
            }

        }
    }
}
