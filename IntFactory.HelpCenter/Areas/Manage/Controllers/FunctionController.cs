using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using IntFactoryEntity;
using IntFactory.HelpCenter.Models;

namespace IntFactory.HelpCenter.Areas.Manage.Controllers
{
    public class FunctionController : BaseController
    {
        //
        // GET: /Manage/Function/

        public ActionResult Function()
        {
            return View();
        }
        public ActionResult AddType()
        {
            return View();
        }

        public ActionResult DetailsList()
        {
            ViewBag.List = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypeList();
            return View();
        }

        public ActionResult AddDetails()
        {
            var list=IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypesByType("0");
            ViewBag.List = list;                
            return View();
        }       

        public ActionResult UpdateDetails(string id)
        {
            ViewBag.List = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypeList();
            var model = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContentByHelpID(id);
            ViewBag.model = model;
            return View();
        }

        #region ajax

        public JsonResult GetTypes(string filter)
        {
            JavaScriptSerializer jssl = new JavaScriptSerializer();
            FilterTypes model = jssl.Deserialize<FilterTypes>(filter);
            int totalCount = 0;
            int pageCount = 0;

            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypes(model.Types, model.Keywords, model.BeginTime, model.EndTime,model.OrderBy, model.PageSize, model.PageIndex, ref totalCount, ref pageCount);
            JsonDictionary.Add("items", list);
            JsonDictionary.Add("totalCount", totalCount);
            JsonDictionary.Add("pageCount", pageCount);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetContent(string filter)
        {
            JavaScriptSerializer jssl = new JavaScriptSerializer();
            FilterTypes model = jssl.Deserialize<FilterTypes>(filter);
            int totalCount = 0;
            int pageCount = 0;
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypeList();
            var obj = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContent(model.Types, model.Keywords, model.BeginTime, model.EndTime, model.OrderBy, model.PageSize, model.PageIndex, ref totalCount, ref pageCount);
            JsonDictionary.Add("items", obj);
            JsonDictionary.Add("list", list);
            JsonDictionary.Add("totalCount", totalCount);
            JsonDictionary.Add("pageCount", pageCount);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetTypeByTypes(string type) {
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypesByType(type);
            JsonDictionary.Add("items",list);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
                
        public JsonResult InsertType(string name, string types)
        {
            var userID = "2faf2062-6f13-4d01-8187-d343eff27222";
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.InsertType(name, types, userID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult InsertContent(string typeID, string title,string keyWords, string keywords, string desc)
        {
            var userID = "2faf2062-6f13-4d01-8187-d343eff27222";
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.InsertContent(typeID, title, keyWords, desc, userID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult UpdateType(string typeID, string name, string types)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.UpdateType(typeID, name, types);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult UpdateContent(string id, string title, string keyWords, string content, string typeID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.UpdateContent(id, title, keyWords, content, typeID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult DeleteType(string typeID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.DeleteType(typeID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult DeleteContent(string helpID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.DeleteContent(helpID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        #endregion
    }
}
