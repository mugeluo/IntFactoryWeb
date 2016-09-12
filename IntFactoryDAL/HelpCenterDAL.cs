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

        public DataTable GetContentByContentID(string contentID)
        {
            string sqlTxt = " select *,t.name as typename,t.moduletype  from M_HelpContent as c left join M_Helptype as t on c.typeid=t.typeid where c.Status<>9 and c.ContentID='" + contentID + "'";
            sqlTxt += "  update M_HelpContent set ClickNumber=ClickNumber+1 where ContentID='" + contentID + "'";
            DataTable dt = GetDataTable(sqlTxt);

            return dt;
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

        #endregion



    }
}
