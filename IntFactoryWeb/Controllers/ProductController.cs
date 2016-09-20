using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IntFactoryWeb.Controllers
{
    public class ProductController : BaseController
    {
        //
        // GET: /Product/

        public ActionResult Product()
        {
            return View();
        }

    }
}
