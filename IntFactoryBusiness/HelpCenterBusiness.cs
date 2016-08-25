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

        #endregion


        #region 添加
        public bool InsertUsers(string Acccount,string Password)
        {
            var UserID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertUsers(UserID, Acccount, Password);
        }

        public bool InsertType( string Name, string Types, string UserID)
        {
            var TypeID = Guid.NewGuid().ToString().ToLower();
            return HelpCenterDAL.BaseProvider.InsertType(TypeID, Name, Types, UserID);
        }

        #endregion

        #region 编辑

        #endregion

        #region 删除

        #endregion
    }
}
