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

        #region 查询
        public List<TypeEntity> GetTypesByModuleType(ModuleTypeEnum moduleType)
        {
            List<TypeEntity> list = new List<TypeEntity>();
            DataTable dt = HelpCenterDAL.BaseProvider.GetTypesByModuleType((int)moduleType);
            foreach (DataRow dr in dt.Rows)
            {
                TypeEntity model = new TypeEntity();
                model.FillData(dr);
                list.Add(model);
            }

            return list;
        }

        public List<TypeEntity> GetTypes()
        {
            List<TypeEntity> list = new List<TypeEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetTypeList();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                TypeEntity model = new TypeEntity();
                model.FillData(dr);
                list.Add(model);
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

        #endregion


        #region 添加
        public int InsertContent(string typeID, string sort, string title, string keyWords, string content, string userID)
        {
            var contentID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertContent(contentID, typeID, sort, title, keyWords, content, userID);
        }

        #endregion
    }
}
