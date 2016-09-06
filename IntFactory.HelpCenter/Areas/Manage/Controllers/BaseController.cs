using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IntFactoryEntity;

namespace IntFactory.HelpCenter.Areas.Manage.Controllers
{
    //[IntFactory.HelpCenter.Common.UserAuthorize]
    public class BaseController : Controller
    {
        //
        // GET: /Manage/Base/
        /// <summary>
        /// 当前登录用户
        /// </summary>
        //protected UsersEntity CurrentUser
        //{
        //    get
        //    {
        //        if (Session["ClientManager"] == null)
        //        {
        //            return null;
        //        }
        //        else
        //        {                   
        //            return (UsersEntity)Session["ClientManager"];
        //        }
        //    }
        //    set { Session["ClientManager"] = value; }
        //}

        protected Dictionary<string, object> JsonDictionary = new Dictionary<string, object>();

    }
}
