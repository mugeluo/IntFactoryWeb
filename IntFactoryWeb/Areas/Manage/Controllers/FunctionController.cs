using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
            ViewBag.List = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypes();
            return View();                         
        }

        #region ajax

        public JsonResult GetTypes()
        {
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypes();
            JsonDictionary.Add("items", list);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetContent()
        {
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypes();
            var obj = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContent();
            JsonDictionary.Add("items", obj);
            JsonDictionary.Add("list", list);
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
