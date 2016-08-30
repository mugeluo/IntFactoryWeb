using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using IntFactoryEntity;

namespace IntFactoryWeb.Areas.Manage.Controllers
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
            return View();
        }

        public ActionResult FunctionDetails()
        {
            ViewBag.List = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypeList();
            return View();                         
        }

        #region ajax

        public JsonResult GetTypes(string filter)
        {
            JavaScriptSerializer jssl = new JavaScriptSerializer();
            TypeEntity model = jssl.Deserialize<TypeEntity>(filter);
            int totalCount = 0;
            int pageCount = 0;

            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypes(model.PageSize, model.PageIndex,ref totalCount, ref pageCount);
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
            HelpEntity model = jssl.Deserialize<HelpEntity>(filter);
            int totalCount = 0;
            int pageCount = 0;
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypeList();
            var obj = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContent(model.PageSize, model.PageIndex, ref totalCount, ref pageCount);
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

        public JsonResult InsertType(string Name, string Types)
        {
            var UserID = "2faf2062-6f13-4d01-8187-d343eff27222";
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.InsertType(Name, Types, UserID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult InsertContent(string TypeID,string Title,string desc)
        {
            var UserID = "2faf2062-6f13-4d01-8187-d343eff27222";
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.InsertContent(TypeID, Title, desc, UserID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet                
            };
        }

        public JsonResult UpdateType(string TypeID,string Name,string Types)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.UpdateType(TypeID, Name, Types);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult UpdateContent(string HelpID, string Title, string Content, string TypeID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.UpdateContent(HelpID, Title, Content, TypeID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult DeleteType(string TypeID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.DeleteType(TypeID);
            JsonDictionary.Add("status",bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult DeleteContent(string HelpID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.DeleteContent(HelpID);
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
