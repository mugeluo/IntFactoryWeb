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

        public List<UsersEntity> GetUesrs()
        {
            List<UsersEntity> list = new List<UsersEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetTypes();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                UsersEntity model = new UsersEntity();
                model.FillData(dr);
                list.Add(model);
            }
            return list;
        }

        public TypeEntity GetTypesByTypeID(string TypeID)
        {
            DataSet ds = HelpCenterDAL.BaseProvider.GetTypesByTypeID(TypeID);
            TypeEntity model = new TypeEntity();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                model.FillData(dr);                
            }
            return model;
        }
        
        public List<TypeEntity> GetTypes()
        {
            List<TypeEntity> list = new List<TypeEntity>();
            DataSet ds = HelpCenterDAL.BaseProvider.GetTypes();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                TypeEntity model = new TypeEntity();
                model.FillData(dr);
                list.Add(model);
            }
            return list;
        }

        public List<HelpEntity> GetContent()
        {
            List<HelpEntity> list = new List<HelpEntity>();
            DataTable dt = HelpCenterDAL.BaseProvider.GetContent();
            foreach (DataRow dr in dt.Rows)
            {
                HelpEntity model = new HelpEntity();
                model.FillData(dr);

                model.Types = HelpCenterBusiness.BaseBusiness.GetTypesByTypeID(model.TypeID);
                list.Add(model);
            }
            return list;
        }

        #endregion


        #region 添加
        public bool InsertUsers(string Acccount,string Password)
        {
            var UserID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertUsers(UserID, Acccount, Password);
        }

        public int InsertType(string Name, string Types, string UserID)
        {
            var TypeID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertType(TypeID, Name, Types, UserID);
        }

        public int InsertContent(string TypeID, string Title, string Content, string UserID)
        {
            var HelpID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertContent(HelpID,TypeID, Title, Content, UserID);
        }

        #endregion



        #region 编辑

        public bool UpdateType(string TypeID, string Name, string Types)
        {
            return HelpCenterDAL.BaseProvider.UpdateType(TypeID, Name, Types);
        }

        public bool UpdateContent(string HelpID, string Title, string Content, string TypeID)
        {
            return HelpCenterDAL.BaseProvider.UpdateContent(HelpID, Title, Content,TypeID);
        }

        #endregion


        #region 删除

        public int DeleteType(string TypeID)
        {
            return HelpCenterDAL.BaseProvider.DeleteType(TypeID);
        }

        public bool DeleteContent(string HelpID)
        {
            return HelpCenterDAL.BaseProvider.DeleteContent(HelpID);
        }
        #endregion
    }
}
