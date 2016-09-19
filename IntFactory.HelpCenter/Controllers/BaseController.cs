using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IntFactory.HelpCenter.Controllers
{

    public class BaseController : Controller
    {
        protected IntFactoryEntity.UsersEntity CurrentUser
        {
            get
            {
                if (Session["Manager"] == null)
                {
                    return null;
                }
                else
                {
                    return (IntFactoryEntity.UsersEntity)Session["Manager"];
                }
            }
            set { Session["Manager"] = value; }
        }

        protected Dictionary<string, object> JsonDictionary = new Dictionary<string, object>();

    }
}
