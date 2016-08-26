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
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContent();
            JsonDictionary.Add("items", list);
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

        #endregion
    }
}
