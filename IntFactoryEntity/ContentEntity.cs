using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntFactoryEntity
{
    public class ContentEntity
    {
        public int AutoID{ get; set; }

        public string ContentID{ get; set; }

        public string TypeID { get; set; }

        public TypeEntity Types { get; set; }

        public string Title { get; set; }

        public string KeyWords { get; set; }

        public int Sort { get; set; }

        public string Detail { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateUserID { get; set; }

        public int ClickNumber { get; set; }

        public int Status { get; set; }

        //public int PageSize { get; set; }

        //public int PageIndex { get; set; }


        public void FillData(System.Data.DataRow dr)
        {
            dr.FillData(this);
        }
    }
}
