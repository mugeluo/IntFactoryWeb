using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IntFactory.HelpCenter.Controllers
{
    public class ContentsController : BaseController
    {
        //
        // GET: /Contents/

        public ActionResult Contents(string id)
        {
            if (id==null)
            {
                ViewBag.model = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetFunctionTypes();
            }
            else
            {
                var model = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetFunctionType(id);
                ViewBag.model =model;
            }   
            return View();
        }

    }
}
