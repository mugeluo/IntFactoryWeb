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
            sqlTxt = "select * from Users where Status<>9";
            DataSet ds = GetDataSet(sqlTxt);
            return ds;
        }

        public DataSet GetTypes(int types, string keyWords, string beginTime, string endTime, string orderBy, int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            string tableName = "Type";
            string key = "TypeID";
            SqlParameter[] param ={ new SqlParameter("@totalCount",totalCount),
                                    new SqlParameter("@pageCount",pageCount),
                                    new SqlParameter("@tableName",tableName),
                                    new SqlParameter("@key",key),
                                    new SqlParameter("@types",types),
                                    new SqlParameter("@keyWords",keyWords),
                                    new SqlParameter("@beginTime",beginTime),
                                    new SqlParameter("@endTime",endTime),
                                    new SqlParameter("@orderBy",orderBy),
                                    new SqlParameter("@pageSize",pageSize),
                                    new SqlParameter("@pageIndex",pageIndex)                                    
                                 };
            param[0].Value = totalCount;
            param[1].Value = pageCount;

            param[0].Direction = ParameterDirection.InputOutput;
            param[1].Direction = ParameterDirection.InputOutput;
            DataSet ds = GetDataSet("P_GetTypeList", param, CommandType.StoredProcedure);
            totalCount = Convert.ToInt32(param[0].Value);
            pageCount = Convert.ToInt32(param[1].Value);
            return ds;
        }

        public DataSet GetTypeList()
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Type  where Status<>9";
            DataSet ds = GetDataSet(sqlTxt);            
            return ds;
        }

        public DataSet GetContent(string typeID, string keyWords, string beginTime, string endTime, string orderBy, int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            string tableName = "Help";
            string key = "HelpID";
            SqlParameter[] param ={ new SqlParameter("@totalCount",totalCount),
                                    new SqlParameter("@pageCount",pageCount),
                                    new SqlParameter("@tableName",tableName),
                                    new SqlParameter("@key",key),
                                    new SqlParameter("@typeID",typeID),
                                    new SqlParameter("@keyWords",keyWords),
                                    new SqlParameter("@beginTime",beginTime),
                                    new SqlParameter("@endTime",endTime),
                                    new SqlParameter("@orderBy",orderBy),
                                    new SqlParameter("@pageSize",pageSize),
                                    new SqlParameter("@pageIndex",pageIndex)                                
                                 };
            param[0].Value = totalCount;
            param[1].Value = pageCount;

            param[0].Direction = ParameterDirection.InputOutput;
            param[1].Direction = ParameterDirection.InputOutput;
            DataSet ds = GetDataSet("P_GetContentList", param, CommandType.StoredProcedure);
            totalCount = Convert.ToInt32(param[0].Value);
            pageCount = Convert.ToInt32(param[1].Value);
            return ds;
        }

        public DataTable GetTypesByTypeID(string typeID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Type  where Status<>9 and TypeID='"+typeID+"'";
            DataTable ds = GetDataTable(sqlTxt);
            return ds;
        }
        public DataSet GetTypesByType(string type)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Type  where Status<>9 and Types='" + type + "'";
            DataSet ds = GetDataSet(sqlTxt);
            return ds;
        }

        public DataTable GetContentByHelpID(string helpID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Help where Status<>9 and HelpID='" + helpID + "'";
            DataTable dt = GetDataTable(sqlTxt);
            return dt;
        }

        #endregion



        #region 添加

        public bool InsertUsers(string userID,string account,string password) 
        {
            string sqlTxt = string.Empty;
            sqlTxt = "insert into Users (UserID,Account,Password) values('"+userID+"','"+account+"','"+password+"')";
            var num= ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        public int InsertType(string typeID, string name, string types,string img, string userID)
        {            
            int result = 0;
            SqlParameter[] param ={ new SqlParameter("@Result",result),
                                    new SqlParameter("@TypeID",typeID),
                                    new SqlParameter("@Name",name),
                                    new SqlParameter("@img",img),
                                    new SqlParameter("@Types",types),
                                    new SqlParameter("@UserID",userID)
                                 };
            param[0].Direction = ParameterDirection.Output;
            ExecuteNonQuery("P_InsertType", param, CommandType.StoredProcedure);
            result = Convert.ToInt32(param[0].Value);
            return result;
        }

        public int InsertContent(string helpID, string typeID, string title, string keyWords, string content, string userID)
        {
            int result = 0;
            SqlParameter[] param ={ new SqlParameter("@Result",result),
                                    new SqlParameter("@HelpID",helpID),
                                    new SqlParameter("@TypeID",typeID),
                                    new SqlParameter("@Title",title),
                                    new SqlParameter("@KeyWords",keyWords),
                                    new SqlParameter("@UserID",userID),
                                    new SqlParameter("@Content",content)
                                 };
            param[0].Direction = ParameterDirection.Output;
            ExecuteNonQuery("P_InsertContent", param, CommandType.StoredProcedure);
            result = Convert.ToInt32(param[0].Value);
            return result;
        }

        #endregion



        #region 编辑

        public bool UpdateType(string typeID, string name, string types)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "Update Type set Name='"+name+"',Types='"+types+"' where TypeID='" + typeID + "'";
            var num = ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        public bool UpdateContent(string helpID, string title, string keyWords, string content, string typeID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "Update Help set Title='" + title + "',KeyWords='" + keyWords + "',Content='" + content + "',TypeID='" + typeID + "' where HelpID='" + helpID + "'";
            var num = ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        #endregion



        #region 删除

        public int DeleteType(string typeID) 
        {
            int result = 0;
            SqlParameter[] param ={ new SqlParameter("@Result",result),
                                    new SqlParameter("@TypeID",typeID)                                    
                                 };
            param[0].Direction = ParameterDirection.Output;
            ExecuteNonQuery("P_DeleteType", param, CommandType.StoredProcedure);
            result = Convert.ToInt32(param[0].Value);
            return result;
        }

        public bool DeleteContent(string helpID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "Update Help set Status=9 where HelpID='" + helpID+"'";
            var num = ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        #endregion
    }
}
