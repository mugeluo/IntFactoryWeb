using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IntFactoryEntity;

namespace IntFactory.HelpCenter.Areas.Manage.Controllers
{
    [IntFactory.HelpCenter.Common.UserAuthorize]
    public class BaseController : Controller
    {
        protected Dictionary<string, object> JsonDictionary = new Dictionary<string, object>();

    }
}
