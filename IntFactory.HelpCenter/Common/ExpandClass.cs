using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using IntFactoryEntity;
using System.Web.Script.Serialization;

public static class ExpandClass
{   

    /// <summary>
    /// 将对象转换成JSON对象
    /// </summary>
    /// <param name="html"></param>
    /// <param name="data"></param>
    /// <returns></returns>
    public static string ToJSONString(this HtmlHelper html, object data)
    {
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        if (data != null && !string.IsNullOrEmpty(data.ToString()))
        {
            return (serializer.Serialize(data)).Replace(@"\n", "");
        }
        return string.Empty;
    }
}
