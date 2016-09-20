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
            var items = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypes();
            var qaTypes = items.FindAll(m => m.ModuleType == 2);
            ViewBag.list = qaTypes;
            ViewBag.HotQAContents = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetHotQAContents();

            return View();
        }

        public ActionResult HotProblems()
        {
            ViewBag.QAContents = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetQAContents();
            ViewBag.HotQAContents = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetHotQAContents();
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
            var items = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContents(model.ModuleType, model.TypeID, model.Keywords, model.BeginTime, model.EndTime, model.OrderBy, model.PageSize, model.PageIndex, ref totalCount, ref pageCount);

            JsonDictionary.Add("items", items);
            JsonDictionary.Add("totalCount", totalCount);
            JsonDictionary.Add("pageCount", pageCount);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetClickNumberList(int modelType)
        {
            var items = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContentsByModuleType(modelType);
            JsonDictionary.Add("items", items);           
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

    }
}
