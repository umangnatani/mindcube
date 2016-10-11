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

        public static int ToInt(this int? value)
        {
            return value == null? 0 : (int)value;

        }
    }
}
