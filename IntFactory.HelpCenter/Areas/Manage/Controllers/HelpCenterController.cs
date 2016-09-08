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
    public class HelpCenterController : BaseController
    {
        //
        // GET: /Manage/Function/

        public ActionResult TypeList()
        {                      
            return View();
        }

        public ActionResult AddType()
        {
            return View();
        }

        public ActionResult DetailList()
        {
            ViewBag.List = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypeList();
            return View();
        }

        public ActionResult AddDetail()
        {
            var list=IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypesByType(1);
            ViewBag.List = list;                
            return View();
        }       

        public ActionResult UpdateDetail(string id)
        {
            var model = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContentByContentID(id);
            ViewBag.List = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypesByType(model.Types.ModuleType);
            ViewBag.model =model;
            return View();
        }

        public ActionResult Detail(string id)
        {
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypeList();           
            var model = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContentByContentID(id);
            foreach (var item in list)
            {
                if (item.TypeID==model.TypeID)
                {
                    ViewBag.item = item;
                }
            }
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
            var obj = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContent(model.Types,model.TypeID, model.Keywords, model.BeginTime, model.EndTime, model.OrderBy, model.PageSize, model.PageIndex, ref totalCount, ref pageCount);
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

        public JsonResult GetTypeByTypes(int type) {
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypesByType(type);
            JsonDictionary.Add("items",list);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
                
        public JsonResult InsertType(string name,string desc, int types,string img)
        {            
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.InsertType(name,desc, types,img, CurrentUser.UserID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult InsertContent(string typeID, string sort,string title,string keyWords, string desc)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.InsertContent(typeID, sort, title, keyWords, desc, CurrentUser.UserID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult UpdateType(string typeID, string name, string img,string types)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.UpdateType(typeID, name,img, types);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult UpdateContent(string id, string title,string sort, string keyWords, string content, string typeID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.UpdateContent(id, title,sort, keyWords, content, typeID);
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

        public JsonResult DeleteContent(string contentID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.DeleteContent(contentID);
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
