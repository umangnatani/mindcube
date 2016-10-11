using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntLib
{
    public static class Extensions
    {
        public static DateTime? ToDateTime(this string value)
        {
            return string.IsNullOrEmpty(value) ? (DateTime?)null : DateTime.Parse(value);

        }
    }
}
