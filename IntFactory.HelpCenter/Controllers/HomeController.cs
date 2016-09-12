using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using IntFactoryBusiness;
using IntFactoryEntity;

namespace IntFactory.HelpCenter.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Search()
        {
            return View();
        }

        public JsonResult GetTypesByModuleType(int type)
        {
            var item = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypesByModuleType((ModuleTypeEnum)type);
            JsonDictionary.Add("items",item);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}
