using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using Qiniu.Auth;
using Qiniu.IO;
using Qiniu.IO.Resumable;
using Qiniu.RS;
using Qiniu.RPC;
using Qiniu.Conf;

namespace IntFactory.HelpCenter.Areas.Manage.Controllers
{
    public class PlugController : BaseController
    {
        public JsonResult GetToken()
        {
            Config.Init();
            //普通上传,只需要设置上传的空间名就可以了,第二个参数可以设定token过期时间
            PutPolicy put = new PutPolicy(IntFactory.HelpCenter.Common.Common.QNBucket, 3600);
            //调用Token()方法生成上传的Token
            string upToken = put.Token();
            JsonDictionary.Add("uptoken", upToken);
            JsonDictionary.Add("qnBucket", IntFactory.HelpCenter.Common.Common.QNBucket);
            JsonDictionary.Add("qnDomianUrl", IntFactory.HelpCenter.Common.Common.QNDomianUrl);

            return new JsonResult()
            {
                Data = JsonDictionary,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        public int DeleteAttachment(string key)
        {
            Config.Init();
            //实例化一个RSClient对象，用于操作BucketManager里面的方法
            RSClient client = new RSClient();
            CallRet ret = client.Delete(new EntryPath(IntFactory.HelpCenter.Common.Common.QNBucket, key));

            return ret.OK ? 1 : 0;
        }

        public bool UploadAttachment(string key)
        {
            Config.Init();
            IOClient target = new IOClient();
            PutExtra extra = new PutExtra();
            //普通上传,只需要设置上传的空间名就可以了,第二个参数可以设定token过期时间
            PutPolicy put = new PutPolicy(IntFactory.HelpCenter.Common.Common.QNBucket, 3600);

            //调用Token()方法生成上传的Token
            string upToken = put.Token();
            //上传文件的路径
            String filePath = string.Empty;

            //调用PutFile()方法上传
            PutRet ret = target.PutFile(upToken, key, filePath, extra);


            return ret.OK;
        }

        
        
    }
}
