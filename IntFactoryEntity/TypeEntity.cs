﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntFactoryEntity
{
    public class TypeEntity
    {
        public int ID { get; set; }

        public string TypeID { get; set; }

        public string Name { get; set; }

        public DateTime CreateTime { get; set; }

        public string Img { get; set; }

        public string Types { get; set; }

        public string UserID { get; set; }

        public int Status { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public void FillData(System.Data.DataRow dr)
        {
            dr.FillData(this);
        }
    }
}
