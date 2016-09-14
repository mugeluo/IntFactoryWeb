using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntFactory.HelpCenter.Models
{
    [Serializable]
    public class GetFeedBack
    {
        public int AutoID { get; set; }

        public string Title { get; set; }

        public string ContactName { get; set; }

        public string MobilePhone { get; set; }

        public int Type { get; set; }

        public int Status { get; set; }

        public string FilePath { get; set; }

        public string Remark { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateUserID { get; set; }

        public string Content { get; set; }

        public string Keywords { get; set; }

        public string BeginTime { get; set; }

        public string EndTime { get; set; }

        public string OrderBy { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }
    }
}