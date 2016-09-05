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

        public string UserName { get; set; }

        public string Account { get; set; }

        public string Passwords { get; set; }

        public DateTime CreateTime { get; set; }

        public int Status { get; set; }

        public string Remark { get; set; }

        public void FillData(System.Data.DataRow dr)
        {
            dr.FillData(this);
        }
    }
}
