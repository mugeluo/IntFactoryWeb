using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IntFactoryWeb.Common
{
    public class UserAuthorize : AuthorizeAttribute
    {
         protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            return true;
        }

         public override void OnAuthorization(AuthorizationContext filterContext)
         {
             base.OnAuthorization(filterContext);
             var controller = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName.ToLower();
             var action = filterContext.ActionDescriptor.ActionName.ToLower();

             if (IsMobileDevice())
             {
                 filterContext.Result = new RedirectResult("/m/" + controller + "/" + action);
             }
         }

         public bool IsMobileDevice()
         {
             string[] mobileAgents = { "iphone", "android", "phone", "mobile", "wap", "netfront", "java", "opera mobi", 
                                        "opera mini", "ucweb", "windows ce", "symbian", "series","webos", "sony", "blackberry", "dopod", "nokia",
                                        "samsung", "palmsource", "xda", "pieplus", "meizu", "midp", "cldc", "motorola", "foma","docomo", 
                                        "up.browser", "up.link", "blazer", "helio", "hosin", "huawei", "novarra", "coolpad", "webos", "techfaith",
                                        "palmsource", "alcatel","amoi", "ktouch", "nexian", "ericsson", "philips", "sagem", "wellcom", "bunjalloo", 
                                        "maui", "smartphone", "iemobile", "spice", "bird", "zte-", "longcos", "pantech", "gionee", "portalmmm", 
                                        "jig browser", "hiptop", "benq", "haier", "^lct", "320x320", "240x320", "176x220",  "w3c ", "acs-", "alav", 
                                        "alca", "amoi", "audi", "avan", "benq", "bird", "blac", "blaz", "brew", "cell", "cldc", "cmd-", "dang", "doco",
                                        "eric", "hipt", "inno", "ipaq", "java", "jigs", "kddi", "keji", "leno", "lg-c", "lg-d", "lg-g", "lge-", "maui", 
                                        "maxo", "midp", "mits","mmef", "mobi", "mot-", "moto", "mwbp", "nec-", "newt", "noki", "oper", "palm", "pana", 
                                        "pant", "phil", "play", "port", "prox", "qwap", "sage", "sams", "sany", "sch-", "sec-", "send", "seri", "sgh-",
            "shar", "sie-", "siem", "smal", "smar", "sony", "sph-", "symb", "t-mo","teli", "tim-", "tosh", "tsm-", "upg1", "upsi", "vk-v", "voda",
            "wap-", "wapa", "wapi", "wapp", "wapr", "webc", "winw", "winw", "xda", "xda-", "Googlebot-Mobile" };
             bool isMoblie = false;
             string userAgent = System.Web.HttpContext.Current.Request.UserAgent.ToString().ToLower();
             if (userAgent != null)
             {
                 for (int i = 0; i < mobileAgents.Length; i++)
                 {
                     if (userAgent.IndexOf(mobileAgents[i]) >= 0)
                     {
                         isMoblie = true;
                         break;
                     }
                 }
             }
             if (isMoblie)
             {
                 return true;
             }
             else
             {
                 return false;
             }
         }

    }
}