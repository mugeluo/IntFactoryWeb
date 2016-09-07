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

        public UsersEntity GetUesrsByAccound(string userName,string pwd)
        {
            UsersEntity list = null;
            pwd = HelpCenter.Encrypt.GetEncryptPwd(pwd, userName);
            DataTable dt = HelpCenterDAL.BaseProvider.GetUesrsByAccound(userName, pwd);
            if (dt.Rows.Count > 0)
            {
                list = new UsersEntity();
                foreach (DataRow dr in dt.Rows)
                {
                    list.FillData(dr);
                }
            }
            return list;
        }

        public List<UsersEntity> GetUesrs()
        {
            List<UsersEntity> list = new List<UsersEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetUesrs();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                UsersEntity model = new UsersEntity();
                model.FillData(dr);
                list.Add(model);
            }
            return list;
        }

        public TypeEntity GetTypesByTypeID(string typeID)
        {
            DataTable ds = HelpCenterDAL.BaseProvider.GetTypesByTypeID(typeID);
            TypeEntity model = new TypeEntity();
            foreach (DataRow dr in ds.Rows)
            {
                model.FillData(dr);                
            }
            return model;
        }

        public List<TypeEntity> GetTypesByType(int type)
        {
            List<TypeEntity> list = new List<TypeEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetTypesByType(type);            
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                TypeEntity model = new TypeEntity();
                model.FillData(dr);
                list.Add(model);
            }
            return list;
        }

        public List<TypeEntity> GetTypes(int types, string keyWords, string beginTime, string endTime, string orderBy, int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            List<TypeEntity> list = new List<TypeEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetTypes(types,keyWords,beginTime,endTime,orderBy,pageSize, pageIndex, ref totalCount, ref pageCount);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                TypeEntity model = new TypeEntity();
                model.FillData(dr);
                list.Add(model);
            }
            return list;
        }

        public List<TypeEntity> GetTypeList()
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

        public List<ContentEntity> GetContent(int moduleType, string typeID, string keyWords, string beginTime, string endTime, string orderBy, int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            List<ContentEntity> list = new List<ContentEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetContent(moduleType, typeID, keyWords, beginTime, endTime, orderBy, pageSize, pageIndex, ref totalCount, ref pageCount);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                ContentEntity model = new ContentEntity();
                model.FillData(dr);

                model.Types = HelpCenterBusiness.BaseBusiness.GetTypesByTypeID(model.TypeID);
                list.Add(model);
            }
            return list;
        }

        public ContentEntity GetContentByContentID(string contentID)
        {
            ContentEntity list = new ContentEntity();
            DataTable dt = HelpCenterDAL.BaseProvider.GetContentByContentID(contentID);
            foreach (DataRow dr in dt.Rows )
            {
                list.FillData(dr);
            }
            return list;
        }

        #endregion


        #region 添加
        public int InsertUsers(string acccount, string password, string name, string remark, string createUserID)
        {
            var userID = Guid.NewGuid().ToString().ToLower();
            password = HelpCenter.Encrypt.GetEncryptPwd(password, acccount);
            return HelpCenterDAL.BaseProvider.InsertUsers(userID, acccount, password, name, remark,createUserID);
        }

        public int InsertType(string name,string remark ,int types,string img ,string userID)
        {
            var typeID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertType(typeID, name,remark, types,img, userID);
        }

        public int InsertContent(string typeID, string sort,string title, string keyWords, string content, string userID)
        {
            var contentID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertContent(contentID, typeID, sort, title, keyWords, content, userID);
        }

        #endregion



        #region 编辑

        public bool UpdateType(string typeID, string name,string img, string types)
        {
            return HelpCenterDAL.BaseProvider.UpdateType(typeID, name,img, types);
        }

        public bool UpdateContent(string contentID, string title, string sort, string keyWords, string content, string typeID)
        {
            return HelpCenterDAL.BaseProvider.UpdateContent(contentID, title, sort, keyWords, content, typeID);
        }

        public bool UpdateUsers(string userID, string acc, string pwd, string name, string remark) 
        {
            return HelpCenterDAL.BaseProvider.UpdateUsers(userID,acc,pwd,name,remark);
        }

        #endregion


        #region 删除

        public int DeleteType(string typeID)
        {
            return HelpCenterDAL.BaseProvider.DeleteType(typeID);
        }

        public bool DeleteContent(string contentID)
        {
            return HelpCenterDAL.BaseProvider.DeleteContent(contentID);
        }

        public bool DeleteUsers(string userID)
        {
            return HelpCenterDAL.BaseProvider.DeleteUsers(userID);
        }

        #endregion
    }
}
