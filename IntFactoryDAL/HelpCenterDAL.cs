using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntFactoryDAL
{
    public class HelpCenterDAL:BaseDAL
    {
        public static HelpCenterDAL BaseProvider = new HelpCenterDAL();
        #region 查询

        public DataSet GetUesrs()
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Users";
            DataSet ds = GetDataSet(sqlTxt);
            return ds;
        }


        #endregion

        #region 添加

        public bool InsertUsers(string UserID,string Account,string Password) 
        {
            string sqlTxt = string.Empty;
            sqlTxt = "insert into Users (UserID,Account,Password) values('"+UserID+"','"+Account+"','"+Password+"')";
            var num= ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }


        #endregion

        #region 编辑

        #endregion

        #region 删除

        #endregion
    }
}
