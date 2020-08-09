var connection = require("./../config");
const format = require('dateformat');

exports.add_Production = (req, res) => {

  const ProductionDate = req.body.ProductionDate;
  const TblId = req.body.TblId;
  const ProductionTime = req.body.ProductionTime;
  const MasterBox = req.body.MasterBox;
  const ItemId = req.body.ItemId;

  var sql =
    "insert into productiontbl(ProductionDate,TblId,ProductionTime,MasterBox,ItemId) values(?,?,?,?,?)";

  connection.query(
    sql,
    [ProductionDate, TblId, ProductionTime, MasterBox, ItemId],
    (error, result) => {
      if (error) {
        var err = {
          status: false,
          message: error.message,
        };
        return res.status(500).json(err);
      } 
      else
      {
        if(result.affectedRows > 0)
        {
          
          var updateSql = "UPDATE itemmastertbl SET Inventory = (CASE WHEN Inventory IS NULL OR Inventory='' THEN ? ELSE Inventory +? END)  WHERE ItemId = ?";

          var updateValue = [MasterBox,MasterBox,ItemId];

          connection.query(updateSql, updateValue, (err,results) => {
            if (err) {
              var data = {
                status: false,
                message: error.message,
              };
              return res.status(500).json(data);
            }
            else
            {
              if(results.affectedRows > 0 )
              {
                var data = {
                  status: true,
                  message:"Record Inserted",
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
        else
        {
            var data = {
                status: false,
                message: 'Something went wrong! Please try again later',
              };
        
              return res.status(500).json(data);
        }
      }
    }
  );
};

exports.get_all_production = (req, res) => {
  var sql =
    "SELECT * from productiontbl p,itemmastertbl i,tbnotbl t,categorytbl c where p.ItemId = i.ItemId and p.TblId = t.TblId and c.CategoryId = i.CategoryId";
    
  connection.query(sql, (error, results) => {
    if (error) {
      var data = {
        status: false,
        message: error.message,
      };

      return res.status(500).json(data);
    } else {
      
      if (results.length > 0) {
        var newObj = [];
        for (var i = 0; i < results.length; i++) {

            var temp = results[i].ProductionDate;
            var pd = format(temp,'dd-mm-yyyy');
            temp = results[i].CreatedAt;
            var ca = format(temp,'dd-mm-yyyy');

          newObj.push({
            ProductionId: results[i].ProductionId,
            ProductionDate:pd,
            TblId: results[i].TblId,
            TblNo: results[i].TblNo,
            ProductionTime: results[i].ProductionTime,
            MasterBox: results[i].MasterBox,
            ItemId: results[i].ItemId,
            ItemCode: results[i].ItemCode,
            Description: results[i].Description,
            Unit: results[i].Unit,
            Inventory: results[i].Inventory,
            ActualCost: results[i].ActualCost,
            TotalValue: results[i].TotalValue,
            CategoryId: results[i].CategoryId,
            CategoryName: results[i].CategoryName,            
            CreatedAt: ca,
          });

        }
        
          var data = {
            status: true,
            production:newObj
          };
        return res.status(200).json(data);
        
      }
      else{
           var data = {
                status: false,
                message: "No data found"
            };

            return res.status(404).json(data);
      }

    }
  });
};

exports.get_production_ById = (req, res) => {

  
  var ProductionId = req.params.ProductionId;

  var sql = "SELECT * from productiontbl p,itemmastertbl i,tbnotbl t,categorytbl c where p.ItemId = i.ItemId and p.TblId = t.TblId and c.CategoryId = i.CategoryId and p.ProductionId = ?";

  connection.query(sql,[ProductionId], (error, results) => {
    if (error) {
      var data = {
        status: false,
        message: error.message,
      };

      return res.status(500).json(data);
    } else {
      if (results.length > 0) {
        var newObj = [];
        for (var i = 0; i < results.length; i++) {

            var temp = results[i].ProductionDate;
            var pd = format(temp,'dd-mm-yyyy');
            temp = results[i].CreatedAt;
            var ca = format(temp,'dd-mm-yyyy');

          newObj.push({
            ProductionId: results[i].ProductionId,
            ProductionDate:pd,
            TblId: results[i].TblId,
            TblNo: results[i].TblNo,
            ProductionTime: results[i].ProductionTime,
            MasterBox: results[i].MasterBox,
            ItemId: results[i].ItemId,
            ItemCode: results[i].ItemCode,
            Description: results[i].Description,
            Unit: results[i].Unit,
            Inventory: results[i].Inventory,
            ActualCost: results[i].ActualCost,
            TotalValue: results[i].TotalValue,
            CategoryId: results[i].CategoryId,
            CategoryName: results[i].CategoryName,            
            CreatedAt: ca
          });

        }
        
        var data = {
          status: true,
          production:newObj
        };
      return res.status(200).json(data);
        
      }
      else{
           var data = {
                status: false,
                message: "No data found"
            };

            return res.status(404).json(data);
      }

    }
  });
};

exports.update_production = (req, res) => {
  
  const ProductionId = req.body.ProductionId;
  const ProductionDate = req.body.ProductionDate;
  const TblId = req.body.TblId;
  const ProductionTime = req.body.ProductionTime;
  const MasterBox = req.body.MasterBox;
  const ItemId = req.body.ItemId;
  
  var sql = "UPDATE productiontbl set ProductionDate = ?,TblId = ?,ProductionTime = ?,MasterBox = ?,ItemId = ? where ProductionId = ?";
    
  var updateData = [ProductionDate,TblId,ProductionTime,MasterBox,ItemId,ProductionId]

  connection.query(sql,updateData,(error, result) => {
      if (error) {
        var err = {
          status: false,
          message: error.message,
        };
        return res.status(500).json(err);
      } else {
        if(result.affectedRows > 0)
        {
            var data = {
                status: true,
                message: result.affectedRows + " Record updated",
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
    }
  );
};

exports.delete_production = (req, res) => {
  
  var ProductionId = req.params.ProductionId;
  
  var sql = "DELETE FROM productiontbl WHERE ProductionId = ?";

 connection.query(sql,[ProductionId], (error,result) => {
  if (error) {
    var err = {
      status: false,
      message: error.message,
    };
    return res.status(500).json(err);
  } else {
    if(result.affectedRows > 0)
      {
          var data = {
              status: true,
              message: result.affectedRows + " Record deleted",
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
};