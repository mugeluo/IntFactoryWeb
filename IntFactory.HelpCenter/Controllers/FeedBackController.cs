using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using IntFactoryBusiness;
using IntFactoryEntity;
using IntFactory.HelpCenter.Models;

namespace IntFactory.HelpCenter.Controllers
{
    public class FeedBackController : BaseController
    {
        //
        // GET: /FeedBack/

        public ActionResult FeedBack()
        {
            return View();
        }

        public ActionResult InsertFeedBack(string entity)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            FeedBack model = serializer.Deserialize<FeedBack>(entity);
            if(CurrentUser==null){
                model.CreateUserID = "";
            }
            else
	        {
                model.CreateUserID = CurrentUser.UserID;
	        }
            

            bool flag =IntFactoryBusiness.HelpCenterBusiness.InsertFeedBack(model);
            JsonDictionary.Add("Result", flag ? 1 : 0);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetFeedBacks(string filter)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            GetFeedBack model = serializer.Deserialize<GetFeedBack>(filter);

            if (CurrentUser == null)
            {
                model.CreateUserID = "";
            }
            else
            {
                model.CreateUserID = CurrentUser.UserID;
            }

            int totalCount = 0, pageCount = 0;
            var list = IntFactoryBusiness.HelpCenterBusiness.GetFeedBacks(model.Keywords, model.CreateUserID, model.BeginTime, model.EndTime, model.Type, model.Status, model.PageSize, model.PageIndex, out totalCount, out pageCount); 
           
            JsonDictionary.Add("items", list);
            JsonDictionary.Add("totalCount", totalCount);
            JsonDictionary.Add("pageCount", pageCount);

            return new JsonResult()
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

    }
}
