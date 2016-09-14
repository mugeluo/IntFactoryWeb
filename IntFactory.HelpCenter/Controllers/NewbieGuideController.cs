using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

using IntFactoryBusiness;
using IntFactoryEntity;
using IntFactory.HelpCenter.Models;
namespace IntFactory.HelpCenter.Controllers
{
    public class NewbieGuideController : BaseController
    {
        //
        // GET: /NewbieGuide/

        public ActionResult NewbieGuide()
        {
            int type = 3;
            var item = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypesByModuleType((ModuleTypeEnum)type);
            ViewBag.item = item;
            return View();
        }

    }
}
