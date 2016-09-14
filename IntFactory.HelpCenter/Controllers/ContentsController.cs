using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IntFactory.HelpCenter.Controllers
{
    public class ContentsController : Controller
    {
        //
        // GET: /Contents/

        public ActionResult Contents()
        {
            var model = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetFunctionTypes();
            ViewBag.model = model;
            return View();
        }

    }
}
