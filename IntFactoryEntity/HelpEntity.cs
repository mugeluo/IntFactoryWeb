using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntFactoryEntity
{
    public class HelpEntity
    {
        public int ID { get; set; }

        public string HelpID { get; set; }

        public string TypeID { get; set; }

        public TypeEntity Types { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatTime { get; set; }

        public string UserID { get; set; }

        public int Number { get; set; }

        public void FillData(System.Data.DataRow dr)
        {
            dr.FillData(this);
        }
    }
}
