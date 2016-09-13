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
    public class ProblemsController : BaseController
    {

        public ActionResult Problems()
        {
            int type = 2;
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypesByModuleType((ModuleTypeEnum)type);
            ViewBag.list = list;
            return View();
        }

        public ActionResult HotProblems()
        {
            return View();
        }

        public ActionResult ProblemsDetail(string id)
        {
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContentByContentID(id);
            ViewBag.list = list;
            return View();
        }

        public JsonResult GetContents(string filter)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            FilterHelpCenterType model = serializer.Deserialize<FilterHelpCenterType>(filter);

            int totalCount = 0;
            int pageCount = 0;
            var items = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContents(model.Types, model.TypeID, model.Keywords, model.BeginTime, model.EndTime, model.OrderBy, model.PageSize, model.PageIndex, ref totalCount, ref pageCount);

            JsonDictionary.Add("items", items);
            JsonDictionary.Add("totalCount", totalCount);
            JsonDictionary.Add("pageCount", pageCount);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

    }
}
