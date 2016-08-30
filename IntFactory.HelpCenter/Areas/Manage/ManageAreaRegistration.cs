﻿using System.Web.Mvc;

namespace IntFactory.HelpCenter.Areas.Manage
{
    public class ManageAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Manage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Manage_default",
                "Manage/{controller}/{action}/{id}",

                new { action = "Index", id = UrlParameter.Optional },
                new string[] { "IntFactory.HelpCenter.Areas.Manage.Controllers" }
            );
        }
    }
}
