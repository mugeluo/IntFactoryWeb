using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntFactory.HelpCenter.Models
{
    [Serializable]
    public class FilterTypes
    {
        public int Types { get; set; }       

        public string TypeID{get; set; }

        public string Keywords { get; set; }

        public string BeginTime { get; set; }

        public string EndTime { get; set; }

        public string OrderBy { get; set; }

        public int PageSize { get; set; }        

        public int PageIndex { get; set; }
    }
}