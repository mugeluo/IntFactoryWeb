using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using IntFactoryBusiness;
using IntFactoryEntity;

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
            //model.CreateUserID = CurrentUser.UserID;

            bool flag =IntFactoryBusiness.HelpCenterBusiness.InsertFeedBack(model);
            JsonDictionary.Add("Result", flag ? 1 : 0);
            return new JsonResult
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetFeedBacks(int pageIndex, int type, int status, string keyWords, string beginDate, string endDate)
        {

            int totalCount = 0, pageCount = 0;
            var list = FeedBackBusiness.GetFeedBacks(keyWords, string.Empty, beginDate, endDate, type, status, PageSize, pageIndex, out totalCount, out pageCount);

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
