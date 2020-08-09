var connection = require("./../config");
const format = require('dateformat');

exports.get_all_tableno = (req, res, next) => {

    var sql = "SELECT * from tbnotbl";

    connection.query(sql, (error, results) => {
        if(error){
            var data = {
                status: false,
                message: error.message,
              };
        
              return res.status(500).json(data);
        }
        else
        {
            if(results.length > 0)
            {
                var data = {
                    status: true,
                    tables:results
                  };
          
                  return res.status(200).json(data);
            }
            else
            {
                var data = {
                    status: false,
                    message: "No data found"
                  };
          
                  return res.status(404).json(data);
            }
        }
    });

};

exports.get_tableno_ById = (req, res, next) => {

    const TblId = req.params.TblId; 

    var sql = "SELECT * from tbnotbl where TblId = ?";

    connection.query(sql,TblId, (error, results) => {
        if(error){
            var data = {
                status: false,
                message: error.message,
              };
        
              return res.status(500).json(data);
        }
        else
        {
            if(results.length > 0)
            {
                var data = {
                    status: true,
                    tables:results
                  };
          
                  return res.status(200).json(data);
            }
            else
            {
                var data = {
                    status: false,
                    message: "No data found"
                  };
          
                  return res.status(404).json(data);
            }
        }
    });

};

exports.add_tableno = (req, res, next) => {

    
    var TableSql = "SELECT * FROM tbnotbl ORDER BY TblId DESC LIMIT 1";

    connection.query(TableSql, (tableError, tableResult) => {

        if(tableError)
        {
            var data = {
                status: false,
                message: tableError.message,
              };
        
              return res.status(500).json(data);
        }
        else
        {
            var insertSql = "";
            var tableNo = 1;
            if(tableResult.length > 0)
            {
                tableNo = tableResult[0].TblNo + 1
                insertSql = "INSERT INTO tbnotbl(TblNo) values(" + tableNo + ")"
            }
            else
            {
                insertSql = "INSERT INTO tbnotbl(TblNo) values(" + tableNo + ")"
            }

            connection.query(insertSql, (insertError, insertResult) => {
                if(insertError)
                {
                    var data = {
                        status: false,
                        message: insertError.message,
                    };
                
                    return res.status(500).json(data);
                }
                else
                {
                    if(insertResult.affectedRows > 0)
                    {
                        var data = {
                            status: true,
                            tableId:insertResult.insertId,
                            tabelNo:tableNo,
                            message: "Record Inserted",
                        };
                
                        return res.status(200).json(data);
                    }
                    else
                    {
                        var data = {
                            status: false,
                            message: 'Something went wrong! Please try again later',
                        };
                    
                        return res.status(500).json(data);
                    }

                    
                }
            });
        }

    });   
};

exports.update_tableno = (req, res, next) => {

    const TblId = req.body.TblId;
    const TblNo = req.body.TblNo;

    var sql = "UPDATE tbnotbl set TblNo = ? where TblId = ?";

    connection.query(sql,[TblNo,TblId], (error, results) => {
        if(error){
            var data = {
                status: false,
                message: error.message,
              };
        
              return res.status(500).json(data);
        }
        else
        {
            if(results.affectedRows > 0)
            {
                var data = {
                    status: true,
                    message: results.affectedRows + " Record Updated",
                  };
          
                  return res.status(200).json(data);
            }
            else
            {
                var data = {
                    status: false,
                    message: "No data found"
                  };
          
                  return res.status(404).json(data);
            }
        }
    });

};

exports.delete_tableno = (req, res, next) => {

    const TblId = req.params.TblId; 

    var sql = "DELETE FROM tbnotbl where TblId = ?";

    connection.query(sql,TblId, (error, results) => {
        if(error){
            var data = {
                status: false,
                message: error.message,
              };
        
              return res.status(500).json(data);
        }
        else
        {
            if(results.affectedRows > 0)
            {
                var data = {
                    status: true,
                    message: results.affectedRows + " Record Deleted",
                  };
          
                  return res.status(200).json(data);
            }
            else
            {
                var data = {
                    status: false,
                    message: "No data found"
                  };
          
                  return res.status(404).json(data);
            }
        }
    });

};