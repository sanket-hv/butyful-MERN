var connection = require("./../config");
const format = require('dateformat');

exports.get_all_modules = (req, res, next) => {

    var sql = "SELECT * from modulestbl";

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
                    modules:results
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

exports.get_modules_ById = (req, res, next) => {

    const ModuleId = req.params.ModuleId; 

    var sql = "SELECT * from modulestbl where ModuleId = ?";

    connection.query(sql,ModuleId, (error, results) => {
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
                    modules:results
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

exports.add_modules = (req, res, next) => {

    const ModuleName = req.body.ModuleName;

    var sql = "insert into modulestbl(ModuleName) values(?)";

    connection.query(sql,ModuleName, (error, results) => {
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
                    message: results.affectedRows + " Record Inserted",
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

exports.update_modules = (req, res, next) => {

    const ModuleId = req.body.ModuleId;
    const ModuleName = req.body.ModuleName;

    var sql = "UPDATE modulestbl set ModuleName = ? where ModuleId = ?";

    connection.query(sql,[ModuleName,ModuleId], (error, results) => {
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

exports.delete_modules = (req, res, next) => {

    const ModuleId = req.params.ModuleId; 

    var sql = "DELETE FROM modulestbl where ModuleId = ?";

    connection.query(sql,ModuleId, (error, results) => {
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