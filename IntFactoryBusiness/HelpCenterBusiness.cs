﻿using System;
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
