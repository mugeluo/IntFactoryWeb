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

        public DataSet GetTypes()
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Type";
            DataSet ds = GetDataSet(sqlTxt);
            return ds;
        }

        public DataSet GetTypesByTypeID(string TypeID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Type where TypeID='" + TypeID + "'";
            DataSet ds = GetDataSet(sqlTxt);
            return ds;
        }

        public DataTable GetContent()
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Help";
            DataTable dt = GetDataTable(sqlTxt);
            return dt;
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

        public bool InsertType(string TypeID, string Name, string Types, string UserID)
        {            
            string sqlTxt = string.Empty;
            sqlTxt = "insert into Type (TypeID,Name,Type,UserID) values('" + TypeID + "','" + Name + "','" + Types + "','" + UserID + "')";
            var num = ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        public bool InsertContent(string HelpID,string TypeID,string Title,string Content,string UserID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "insert into Help (HelpID,TypeID,Title,Content,UserID) values('" + HelpID + "','" + TypeID + "','" + Title + "','" + Content + "','" + UserID + "')";
            var num = ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        #endregion

        #region 编辑

        #endregion

        #region 删除

        #endregion
    }
}
