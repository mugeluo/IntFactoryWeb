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
            return View();
        }
                
        public ActionResult Login()
        {
            if (Session["ClientManager"] != null)
            {
                return Redirect("/Manage/Home/Index");
            }
            HttpCookie cook = Request.Cookies["manage_helpcenter_system"];
            if (cook != null)
            {
                if (cook["status"] == "1")
                {
                    var model = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetUesrsByAccound(cook["username"], cook["pwd"]);
                    if (model != null)
                    {
                        Session["ClientManager"] = model;
                        return Redirect("/Manage/Home/Index");
                    }
                }
            }

            return View();            
        }

        public ActionResult Logout()
        {
            HttpCookie cook = Request.Cookies["manage_helpcenter_system"];
            if (cook != null)
            {
                cook["status"] = "0";
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
            if (item!=null)
            {
                Session["ClientManager"] = item;
                //保持登录状态
                HttpCookie cook = new HttpCookie("manage_helpcenter_system");
                cook["username"] = userName;
                cook["pwd"] = pwd;
                cook["status"] = "1";
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
