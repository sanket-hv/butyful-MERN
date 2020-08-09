var connection = require("./../config");

exports.get_all_Category = (req,res) => {

    var sql = 'SELECT * from categorytbl';

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
                    categorys:results
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
    })

};

exports.get_Category_ById = (req,res) => {

    const CategoryId =req.params.CategoryId;

    var sql = 'SELECT * from categorytbl where CategoryId = ?';

    connection.query(sql, [CategoryId],(error, results) => {
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
                    categorys:results
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
    })

};

exports.add_category = (req,res) => {

    const CategoryName = req.body.CategoryName;

    var sql = 'insert into categorytbl(CategoryName) values(?)';

    connection.query(sql,[CategoryName] ,(error, results) => {
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
                    message: 'Something went wrong! Please try again later',
                  };
            
                  return res.status(500).json(data);
            }
        }
    })

};

exports.update_category = (req,res) => {

    const CategoryId =req.body.CategoryId;
    const CategoryName = req.body.CategoryName;

    let sql = 'UPDATE categorytbl set CategoryName = ? where CategoryId = ?';

    let updateData= [CategoryName,CategoryId];

    connection.query(sql,updateData,(error, results) => {
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
                    message: 'Something went wrong! Please try again later',
                  };
            
                  return res.status(500).json(data);
            }
        }
    })

};

exports.delete_Category_ById = (req,res) => {

    const CategoryId =req.params.CategoryId;
    
    var sql = 'DELETE FROM categorytbl where CategoryId = ?';

    connection.query(sql, [CategoryId],(error, results) => {
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
    })

};
