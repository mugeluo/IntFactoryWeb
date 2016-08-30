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

        public DataSet GetTypes(int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            string tableName = "Type";
            string key = "TypeID";
            SqlParameter[] param ={ new SqlParameter("@totalCount",totalCount),
                                    new SqlParameter("@pageCount",pageCount),
                                    new SqlParameter("@tableName",tableName),
                                    new SqlParameter("@key",key),
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

        public DataSet GetContent(int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            string tableName = "Help";
            string key = "HelpID";
            SqlParameter[] param ={ new SqlParameter("@totalCount",totalCount),
                                    new SqlParameter("@pageCount",pageCount),
                                     new SqlParameter("@tableName",tableName),
                                    new SqlParameter("@key",key),
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

        public DataTable GetTypesByTypeID(string TypeID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from Type  where Status<>9 and TypeID='"+TypeID+"'";
            DataTable ds = GetDataTable(sqlTxt);
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

        public int InsertType(string TypeID, string Name, string Types, string UserID)
        {            
            int result = 0;
            SqlParameter[] param ={ new SqlParameter("@Result",result),
                                    new SqlParameter("@TypeID",TypeID),
                                    new SqlParameter("@Name",Name),
                                    new SqlParameter("@Types",Types),
                                    new SqlParameter("@UserID",UserID)
                                 };
            param[0].Direction = ParameterDirection.Output;
            ExecuteNonQuery("P_InsertType", param, CommandType.StoredProcedure);
            result = Convert.ToInt32(param[0].Value);
            return result;
        }

        public int InsertContent(string HelpID, string TypeID, string Title, string Content, string UserID)
        {
            int result = 0;
            SqlParameter[] param ={ new SqlParameter("@Result",result),
                                    new SqlParameter("@HelpID",HelpID),
                                    new SqlParameter("@TypeID",TypeID),
                                    new SqlParameter("@Title",Title),
                                    new SqlParameter("@UserID",UserID),
                                    new SqlParameter("@Content",Content)
                                 };
            param[0].Direction = ParameterDirection.Output;
            ExecuteNonQuery("P_InsertContent", param, CommandType.StoredProcedure);
            result = Convert.ToInt32(param[0].Value);
            return result;
        }

        #endregion



        #region 编辑

        public bool UpdateType(string TypeID, string Name, string Types)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "Update Type set Name='"+Name+"',Types='"+Types+"' where TypeID='" + TypeID + "'";
            var num = ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        public bool UpdateContent(string HelpID,string Title,string Content,string TypeID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "Update Help set Title='" + Title + "',Content='" + Content + "',TypeID='" + TypeID + "' where HelpID='" + HelpID + "'";
            var num = ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        #endregion



        #region 删除

        public int DeleteType(string TypeID) 
        {
            int result = 0;
            SqlParameter[] param ={ new SqlParameter("@Result",result),
                                    new SqlParameter("@TypeID",TypeID)                                    
                                 };
            param[0].Direction = ParameterDirection.Output;
            ExecuteNonQuery("P_DeleteType", param, CommandType.StoredProcedure);
            result = Convert.ToInt32(param[0].Value);
            return result;
        }

        public bool DeleteContent(string HelpID)
        {
            string sqlTxt = string.Empty;
            sqlTxt = "Update Help set Status=9 where HelpID='" + HelpID+"'";
            var num = ExecuteNonQuery(sqlTxt);
            return num == 1 ? true : false;
        }

        #endregion
    }
}
