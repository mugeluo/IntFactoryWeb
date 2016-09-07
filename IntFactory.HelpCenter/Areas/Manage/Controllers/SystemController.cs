using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Mvc;
using IntFactory.HelpCenter.Models;

namespace IntFactory.HelpCenter.Areas.Manage.Controllers
{
    public class SystemController : BaseController
    {
        //
        // GET: /Manage/System/

        public ActionResult Users()
        {            
            return View();
        }

        public ActionResult AddUsers()
        {
            return View();
        }

        #region ajax

        public JsonResult GetUsers(string filter)
        {
            JavaScriptSerializer jssl = new JavaScriptSerializer();
            FilterTypes model = jssl.Deserialize<FilterTypes>(filter);
            int totalCount = 0;
            int pageCount = 0;
            var list = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetUesrs(model.Keywords,model.BeginTime,model.EndTime,model.OrderBy,model.PageSize,model.PageIndex,ref totalCount,ref pageCount);
            JsonDictionary.Add("items", list);
            JsonDictionary.Add("totalCount", totalCount);
            JsonDictionary.Add("pageCount", pageCount);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult SaveUser(string acc,string pwd,string name,string remark)
        {            
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.InsertUsers(acc, pwd, name, remark, CurrentUser.UserID);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult UpdateUsers(string userID, string acc, string pwd, string name, string remark)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.UpdateUsers(userID,acc, pwd, name, remark);
            JsonDictionary.Add("status", bl);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult DeleteUsers(string userID)
        {
            var bl = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.DeleteUsers(userID);
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
