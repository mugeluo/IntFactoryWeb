using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IntFactory.HelpCenter.Controllers
{
    public class BaseController : Controller
    {
        protected Dictionary<string, object> JsonDictionary = new Dictionary<string, object>();

    }
}
