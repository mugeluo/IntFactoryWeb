using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntFactoryEntity
{
    [Serializable]
    public class UsersEntity
    {
        public int AutoID { get; set; }

        public string UserID { get; set; }

        public string Name { get; set; }

        public string AccountName { get; set; }

        public string Password { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateUserID { get; set; }

        public int Status { get; set; }

        public string Remaek { get; set; }

        public void FillData(System.Data.DataRow dr)
        {
            dr.FillData(this);
        }
    }
}
