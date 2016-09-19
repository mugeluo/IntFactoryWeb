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
    public class HomeController : BaseController
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            if (CurrentUser == null)
            {
                return Redirect("/Home/Login");
            }
            return View();
        }

        public ActionResult Login()
        {
            if (CurrentUser != null)
            {
                return Redirect("/Home/Index");
            }
            return View();
        }

        public ActionResult Search()
        {
            return View();
        }

        public JsonResult UserLogin(string accound,string pwd)
        {
            bool bl = false;    

            var model = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.UserLogin(accound, pwd);
            if (model != null)
            {
                CurrentUser = model;
                Session["Manager"] = model;
                bl = true;
            }
            JsonDictionary.Add("result", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
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

        public JsonResult GetTypes()
        {
            var items = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypes();
            var functionTypes = items.FindAll(m => m.ModuleType == 1);
            var qaTypes = items.FindAll(m => m.ModuleType == 2);
            var guidTypes = items.FindAll(m => m.ModuleType == 3);
            JsonDictionary.Add("functionTypes", functionTypes);
            JsonDictionary.Add("qaTypes", qaTypes);
            JsonDictionary.Add("guidTypes", guidTypes);

            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
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

    }
}
