using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntFactoryEntity
{
    public class LogsEntity
    {
        public int AutoID { get; set; }

        public string TypeID { get; set; }

        public string ContentID { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateUserID { get; set; }

        public string IP { get; set; }
    }
}
