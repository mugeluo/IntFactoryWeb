using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using IntFactoryEntity;
using IntFactoryDAL;
using IntFactoryBusiness;

namespace IntFactoryWeb.Areas.Manage.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Manage/Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddType()
        {
            return View();
        }

        #region ajax

        public JsonResult GetTypes() 
        {
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetTypes();
            JsonDictionary.Add("items",list);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult InsertUsers(string Account,string Password)
        {
            var bl=IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.InsertUsers(Account,Password);
            JsonDictionary.Add("status",bl);
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

        #endregion

    }
}
