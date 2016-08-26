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

        #region ajax

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



        #endregion

    }
}
