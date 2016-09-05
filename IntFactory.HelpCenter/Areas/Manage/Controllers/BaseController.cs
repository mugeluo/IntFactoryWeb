using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IntFactory.HelpCenter.Areas.Manage.Controllers
{
    public class BaseController : Controller
    {
        //
        // GET: /Manage/Base/
        /// <summary>
        /// 当前登录用户
        /// </summary>
        protected IntFactoryEntity.UsersEntity CurrentUser
        {
            get
            {
                if (Session["ClientManager"] == null)
                {
                    return null;
                }
                else
                {
                    return (IntFactoryEntity.UsersEntity)Session["ClientManager"];
                }
            }
            set { Session["ClientManager"] = value; }
        }

        protected Dictionary<string, object> JsonDictionary = new Dictionary<string, object>();

    }
}
