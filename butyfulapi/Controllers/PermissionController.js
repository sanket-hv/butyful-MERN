var connection = require("./../config");
const { image } = require("pdfkit");


exports.get_all_permission = (req, res, next) => {

    var sql = "SELECT p.*,m.ModuleName,u.Username from permissiontbl p,usertbl u,modulestbl m where p.ModuleId = m.ModuleId and p.UserId = u.UserId";

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

exports.get_permissiontbl_By_userId = (req, res, next) => {

    const UserId = req.params.UserId; 

    var sql = "SELECT p.*,m.ModuleName,u.Username from permissiontbl p,usertbl u,modulestbl m where p.ModuleId = m.ModuleId and p.UserId = u.UserId and p.UserId = ?";

    connection.query(sql,UserId, (error, results) => {
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


// exports.add_permission = (req, res, next) => {

//     const ModuleId = req.body.ModuleId;
//     const UserId = req.body.UserId;
//     const flgIsAccess = req.body.flgIsAccess;

//     let sql = "insert into permissiontbl(ModuleId,UserId,flgIsAccess) values(?,?,?)";

//     let insertData = [ModuleId,UserId,flgIsAccess];

//     connection.query(sql,insertData, (error, results) => {
//         if(error){
//             var data = {
//                 status: false,
//                 message: error.message,
//               };
        
//               return res.status(500).json(data);
//         }
//         else
//         {
//             if(results.affectedRows > 0)
//             {
//                 var data = {
//                     status: true,
//                     message: results.affectedRows + " Record Inserted",
//                   };
          
//                   return res.status(200).json(data);
//             }
//             else
//             {
//                 var data = {
//                     status: false,
//                     message: "No data found"
//                   };
          
//                   return res.status(404).json(data);
//             }
//         }
//     });

// };

