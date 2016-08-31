using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IntFactory.HelpCenter.Areas.Manage.Controllers
{
    public class SystemController : BaseController
    {
        //
        // GET: /Manage/System/

        public ActionResult Users()
        {
            return View();
        }

        public ActionResult AddUsers()
        {
            return View();
        }

        #region ajax

        public JsonResult GetUsers()
        {
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetUesrs();
            JsonDictionary.Add("items",list);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        #endregion
    }
}
