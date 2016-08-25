using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntFactoryEntity
{
    public class UsersEntity
    {
        public int ID { get; set; }

        public string UserID { get; set; }

        public string Account { get; set; }

        public string Password { get; set; }

        public DateTime CreateTime { get; set; }

        public void FillData(System.Data.DataRow dr)
        {
            dr.FillData(this);
        }
    }
}
