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
    public class NewbieGuideController : BaseController
    {
        //
        // GET: /NewbieGuide/

        public ActionResult NewbieGuide(string id)
        {            
            //int totalCount = 0;
            //int pageCount = 0;
            //var item = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContents(3,"","","","","c.CreateTime desc",200,1, ref totalCount, ref pageCount);
            
            if (id==null)
            {
                id = "8c333da4-c6a0-4b55-a232-e2ca25c76282";
            }

            var items = IntFactoryBusiness.HelpCenterBusiness.BaseBusiness.GetContentsByTypeID(id);

            //var guidTypes = items.FindAll(m => m.ModuleType == 3);
            //ViewBag.item = guidTypes;


            ViewBag.item =items;
            return View();
        }
    }
}
