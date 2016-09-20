using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
using System.Data.SqlClient;
using IntFactoryDAL;
using IntFactoryEntity;

namespace IntFactoryBusiness
{
    public class HelpCenterBusiness
    {
        public static HelpCenterBusiness BaseBusiness = new HelpCenterBusiness();

        private static List<TypeEntity> Types = null;
        private static DateTime TypesTime = DateTime.Now;

        private static List<TypeEntity> FunctionTypes = null;
        private static DateTime FunctionTypesTime = DateTime.Now;
        private static string FunctionTypesID = null;


        #region 查询
        public List<TypeEntity> GetTypesByModuleType(ModuleTypeEnum moduleType)
        {
            return GetTypes().FindAll(m => m.ModuleType == (int)moduleType);
        }

        public List<TypeEntity> GetTypes()
        {
            List<TypeEntity> list = new List<TypeEntity>();
            if (Types != null && TypesTime > DateTime.Now)
            {
                list = Types;
            }
            else
            {
                DataSet ds = HelpCenterDAL.BaseProvider.GetTypeList();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    TypeEntity model = new TypeEntity();
                    model.FillData(dr);
                    list.Add(model);
                }
                Types = list;
                TypesTime = DateTime.Now.AddHours(2);
            }

            return list;
        }

        public TypeEntity GetFunctionTypes(string id) {
            var list = GetFunctionTypes();

            return list.Find(m => m.TypeID == id);
        }

        public List<TypeEntity> GetFunctionTypes()
        {
            List<TypeEntity> list = new List<TypeEntity>();
            if (FunctionTypes != null && FunctionTypesTime > DateTime.Now)
            {
                list = FunctionTypes;
            }
            else
            {
                DataSet ds = HelpCenterDAL.BaseProvider.GetFunctionTypes();
                DataTable contents=ds.Tables[1];
                
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    TypeEntity model = new TypeEntity();
                    model.FillData(dr);
                    model.contents = new List<ContentEntity>();
                    foreach (DataRow c in contents.Select("typeid='"+model.TypeID+"'")) {
                        ContentEntity content = new ContentEntity();
                        content.FillData(c);
                        model.contents.Add(content);
                    }
                    list.Add(model);
                }
                FunctionTypes = list;
                FunctionTypesTime = DateTime.Now.AddHours(2);
                FunctionTypesID = id;
            }

            return list;
        }

        public List<ContentEntity> GetContents(int moduleType, string typeID, string keyWords, string beginTime, string endTime, string orderBy, int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            List<ContentEntity> list = new List<ContentEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetContents(moduleType, typeID, keyWords, beginTime, endTime, orderBy, pageSize, pageIndex, ref totalCount, ref pageCount);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                ContentEntity model = new ContentEntity();
                model.FillData(dr);
                list.Add(model);
            }
            return list;
        }

        public ContentEntity GetContentByContentID(string contentID)
        {
            ContentEntity item = new ContentEntity();
            DataTable dt = HelpCenterDAL.BaseProvider.GetContentByContentID(contentID);
            foreach (DataRow dr in dt.Rows)
            {
                item.FillData(dr);
            }

            return item;
        }

        public static List<FeedBack> GetFeedBacks(string keywords, string userID, string beginDate, string endDate, int type, int status, int pageSize, int pageIndex, out int totalCount, out int pageCount)
        {
            string sqlWhere = "1=1";
            if (!string.IsNullOrEmpty(keywords))
            {
                sqlWhere += " and (Title like '%" + keywords + "%'";
                sqlWhere += " or ContactName like '%" + keywords + "%'";
                sqlWhere += " or MobilePhone like '%" + keywords + "%'";
                sqlWhere += " or Remark like '%" + keywords + "%' )";
            }

            if (!string.IsNullOrEmpty(userID))
            {
                sqlWhere += " and CreateUserID='" + userID + "'";
            }

            if (status != -1)
            {
                sqlWhere += " and status=" + status;
            }

            if (type != -1)
            {
                sqlWhere += " and type=" + type;
            }

            if (!string.IsNullOrEmpty(beginDate))
            {
                sqlWhere += " and createtime>='" + beginDate + "'";
            }

            if (!string.IsNullOrEmpty(endDate))
            {
                sqlWhere += " and createtime<='" + DateTime.Parse(endDate).AddDays(1).ToString("yyyy-MM-dd") + "'";
            }

            DataTable dt = HelpCenterDAL.GetPagerData("FeedBack", "*", sqlWhere, "AutoID","", pageSize, pageIndex, out totalCount, out pageCount,0);
            List<FeedBack> list = new List<FeedBack>();
            FeedBack model;
            foreach (DataRow item in dt.Rows)
            {
                model = new FeedBack();
                model.FillData(item);
                list.Add(model);
            }

            return list;
        }

        public List<ContentEntity> GetContentsByModuleType(int modelType)
        {
            List<ContentEntity> list = new List<ContentEntity>(modelType);
            DataSet ds = HelpCenterDAL.BaseProvider.GetContentsByModuleType(modelType);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                ContentEntity model = new ContentEntity();
                model.FillData(dr);
                list.Add(model);
            }
            return list;
        }

        public List<ContentEntity> GetNewbieGuides()
        {
            List<ContentEntity> list = new List<ContentEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetNewbieGuides();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                ContentEntity model = new ContentEntity();
                model.FillData(dr);
                list.Add(model);
            }
            return list;
        }

        public UsersEntity UserLogin(string accound, string pwd)
        {
            UsersEntity item = new UsersEntity();
            DataTable dt = HelpCenterDAL.BaseProvider.UserLogin(accound,pwd);
            foreach (DataRow dr in dt.Rows)
            {
                item.FillData(dr);
            }

            return item;
        }

        #endregion


        #region 添加
        public int InsertContent(string typeID, string sort, string title, string keyWords, string content, string userID)
        {
            var contentID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertContent(contentID, typeID, sort, title, keyWords, content, userID);
        }

        public static bool InsertFeedBack(FeedBack model)
        {
            return HelpCenterDAL.BaseProvider.InsertFeedBack(model.Title, model.ContactName, model.MobilePhone,
                model.Type, model.FilePath, model.Remark);
        }

        #endregion
    }
}
