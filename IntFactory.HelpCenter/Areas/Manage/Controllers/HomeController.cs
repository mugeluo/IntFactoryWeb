using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using IntFactoryEntity;
using IntFactoryDAL;
using IntFactoryBusiness;

namespace IntFactory.HelpCenter.Areas.Manage.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Manage/Home/

        public ActionResult Index()
        {
            if (Session["ClientManager"] == null)
            {
                return Redirect("/Manage/Home/Login");
            }
            else
            {
                return Redirect("/Manage/Function/Function");               
            };            
        }

        public ActionResult Login()
        {            
            if (Session["ClientManager"] == null)
            {
                return View();
            }
            else
            {
                return Redirect("/Manage/Function/Function");
            };   
        }

        public ActionResult Logout()
        {
            HttpCookie cook = Request.Cookies["manage_helpcenter_system"];
            if (cook != null)
            {                
                Response.Cookies.Add(cook);
            }
            Session["ClientManager"] = null;

            return Redirect("/Manage/Home/Login");
        }

        #region ajax        

        public JsonResult UserLogin(string userName, string pwd)
        {
            var item = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetUesrsByAccound(userName, pwd);
            JsonDictionary.Add("items", item);
            if (item.Count>0)
            {
                //保持登录状态
                HttpCookie cook = new HttpCookie("manage_helpcenter_system");
                cook["username"] = userName;
                cook["pwd"] = pwd;                
                cook.Expires = DateTime.Now.AddDays(7);
                Response.Cookies.Add(cook);
            }
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        #endregion

    }
}
