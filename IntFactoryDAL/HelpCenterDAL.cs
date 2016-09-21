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
        public DataSet GetTypes(int types, string keyWords, string beginTime, string endTime, string orderBy, int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            SqlParameter[] param ={ new SqlParameter("@totalCount",totalCount),
                                    new SqlParameter("@pageCount",pageCount),                                    
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
            DataSet ds = GetDataSet("M_GetHelpTypes", param, CommandType.StoredProcedure);
            totalCount = Convert.ToInt32(param[0].Value);
            pageCount = Convert.ToInt32(param[1].Value);
            return ds;
        }

        public DataSet GetTypeList()
        {
            string sqlTxt = string.Empty;
            sqlTxt = "select * from M_HelpType  where Status<>9";
            DataSet ds = GetDataSet(sqlTxt);
            return ds;
        }

        public DataSet GetFunctionTypes()
        {
            string sqlTxt = "select * from M_HelpType  where Status<>9 and moduletype=1";
            string sqlWhere = "select typeid from M_HelpType  where Status<>9 and moduletype=1";
            sqlTxt += " select * from m_helpcontent where status<>9 and typeid in  (" + sqlWhere + ") ";
            DataSet ds = GetDataSet(sqlTxt);

            return ds;
        }

        public DataSet GetContents(int moduleType, string typeID, string keyWords, string beginTime, string endTime, string orderBy, int pageSize, int pageIndex, ref int totalCount, ref int pageCount)
        {
            SqlParameter[] param ={ 
                                    new SqlParameter("@totalCount",totalCount),
                                    new SqlParameter("@pageCount",pageCount),                                   
                                    new SqlParameter("@ModuleType",moduleType),
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
            DataSet ds = GetDataSet("M_GetHelpContents", param, CommandType.StoredProcedure);
            totalCount = Convert.ToInt32(param[0].Value);
            pageCount = Convert.ToInt32(param[1].Value);

            return ds;
        }

        public DataTable GetTypesByModuleType(int moduleType)
        {
            string sqlTxt = "select * from M_HelpType  where Status<>9";
            if (moduleType != -1)
            {
                sqlTxt += "  and ModuleType=" + moduleType;
            }

            return GetDataTable(sqlTxt);
        }

        public DataSet GetContentsByModuleType(int modelType)
        {
            string sqlTxt = "select top 10 * from M_HelpContent where M_HelpContent.Status<>9 and M_HelpContent.TypeID in(select TypeID from M_HelpType where ModuleType="+modelType+" and M_HelpType.Status<>9) order by M_HelpContent.ClickNumber asc";
            return GetDataSet(sqlTxt);
        }

        public DataSet GetNewbieGuides()
        {
            string sqlTxt = "select * from M_HelpContent where M_HelpContent.Status<>9 and M_HelpContent.TypeID in(select TypeID from M_HelpType where ModuleType=3 and M_HelpType.Status<>9) order by M_HelpContent.ClickNumber asc";
            return GetDataSet(sqlTxt);
        }

        public DataTable GetContentByContentID(string contentID)
        {
            string sqlTxt = " select *,t.name as typename,t.moduletype  from M_HelpContent as c left join M_Helptype as t on c.typeid=t.typeid where c.Status<>9 and c.ContentID='" + contentID + "'";
            sqlTxt += "  update M_HelpContent set ClickNumber=ClickNumber+1 where ContentID='" + contentID + "'";
            DataTable dt = GetDataTable(sqlTxt);

            return dt;
        }

        public static DataTable GetPagerData(string tableName, string columns, string condition, string key, string orderColumn, int pageSize, int pageIndex, out int totalNum, out int pageCount, int isAsc)
        {
            string procName = "P_GetPagerData";
            SqlParameter[] paras = { 
                                        new SqlParameter("@tableName",DbType.String),
                                        new SqlParameter("@columns",DbType.String),
                                        new SqlParameter("@condition",DbType.String),
                                        new SqlParameter("@key",DbType.String),
                                        new SqlParameter("@orderColumn",DbType.String),
                                        new SqlParameter("@pageSize",DbType.Int32),
                                        new SqlParameter("@pageIndex",DbType.Int32),
                                        new SqlParameter("@totalCount",DbType.Int32),
                                        new SqlParameter("@pageCount",DbType.Int32),
                                        new SqlParameter("@isAsc",DbType.Int32),
                                   };
            paras[0].Value = tableName;
            paras[1].Value = columns;
            paras[2].Value = condition;
            paras[3].Value = key;
            paras[4].Value = orderColumn;
            paras[5].Value = pageSize;
            paras[6].Value = pageIndex;
            paras[7].Direction = ParameterDirection.Output;
            paras[8].Direction = ParameterDirection.Output;
            paras[9].Value = isAsc;

            DataTable dt = GetDataTable(procName, paras, CommandType.StoredProcedure);
            totalNum = Convert.ToInt32(paras[7].Value);
            pageCount = Convert.ToInt32(paras[8].Value);
            return dt;
        }

        public DataTable UserLogin(string accound, string pwd)
        {
            string sqlTxt = "select * from Users where LoginName='"+accound+"' and LoginPWD='"+pwd+"'";
            return GetDataTable(sqlTxt);
        }

        #endregion


        #region 添加
        public int InsertContent(string contentID, string typeID, string sort, string title, string keyWords, string detail, string userID)
        {
            int result = 0;
            SqlParameter[] param ={ new SqlParameter("@Result",result),
                                    new SqlParameter("@ContentID",contentID),
                                    new SqlParameter("@TypeID",typeID),
                                    new SqlParameter("@Sort",sort),
                                    new SqlParameter("@Title",title),
                                    new SqlParameter("@KeyWords",keyWords),
                                    new SqlParameter("@UserID",userID),
                                    new SqlParameter("@Detail",detail)
                                 };
            param[0].Direction = ParameterDirection.Output;
            ExecuteNonQuery("M_InsertHelpContent", param, CommandType.StoredProcedure);
            result = Convert.ToInt32(param[0].Value);
            return result;
        }

        public bool InsertFeedBack(string title, string contactName, string mobilePhone, int type, string filePath, string remark,string createUserID)
        {
            SqlParameter[] parms = { 
                                       new SqlParameter("@Title",title),
                                       new SqlParameter("@ContactName",contactName),
                                       new SqlParameter("@MobilePhone",mobilePhone),
                                       new SqlParameter("@Type",type),
                                       new SqlParameter("@FilePath",filePath),
                                       new SqlParameter("@Remark",remark),
                                       new SqlParameter("@CreateUserID",createUserID)
                                   };

            string cmdText = "insert into feedback(Title,ContactName,MobilePhone,Type,FilePath,Remark,CreateUserID) values(@Title,@ContactName,@MobilePhone,@Type,@FilePath,@Remark,@CreateUserID)";
            return ExecuteNonQuery(cmdText, parms, CommandType.Text) > 0;
        }

        #endregion



    }
}
