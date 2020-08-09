var connection = require("./../config");
const format = require('dateformat');

exports.add_itemMaster = (req, res) => {
  
  const ItemCode = req.body.ItemCode;
  const Description = req.body.Description;
  const Unit = req.body.Unit;
  const Inventory = req.body.Inventory;
  const ActualCost = req.body.ActualCost;
  const TotalValue = req.body.TotalValue;
  const CategoryId = req.body.CategoryId;

  var sql ="insert into itemmastertbl(ItemCode,Description,Unit,Inventory,ActualCost,TotalValue,CategoryId) values(?,?,?,?,?,?,?)";

  var insertData = [ItemCode,Description,Unit,Inventory,ActualCost,TotalValue,CategoryId];

  connection.query(sql,insertData,(error, result) => {

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
                    message: result.affectedRows + " Record Inserted",
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

exports.get_all_items = (req, res) => {
  var sql =
    "SELECT * from itemmastertbl i,categorytbl c where i.CategoryId = c.CategoryId";

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

            var temp = results[i].CreatedAt;
            var ca = format(temp,'dd-mm-yyyy');

          newObj.push({
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
            items:newObj
          };
        return res.status(200).json(data);

      } else {
        var data = {
          status: false,
          message: "No data found",
        };

        return res.status(404).json(data);
      }
    }
  });
};

exports.get_items_ById = (req, res) => {

  var ItemId = req.params.ItemId;
  
  var sql =
    "SELECT * from itemmastertbl i,categorytbl c where i.CategoryId = c.CategoryId and i.ItemId = ?";

  connection.query(sql,[ItemId] ,(error, results) => {
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

            var temp = results[i].CreatedAt;
            var ca = format(temp,'dd-mm-yyyy');

          newObj.push({
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
            items:newObj
          };
        return res.status(200).json(data);

      } else {
        var data = {
          status: false,
          message: "No data found",
        };

        return res.status(404).json(data);
      }
    }
  });
};

exports.update_itemMaster = (req, res) => {

  const ItemId = req.body.ItemId;
  const ItemCode = req.body.ItemCode;
  const Description = req.body.Description;
  const Unit = req.body.Unit;
  const Inventory = req.body.Inventory;
  const ActualCost = req.body.ActualCost;
  const TotalValue = req.body.TotalValue;
  const CategoryId = req.body.CategoryId;

  var sql = "UPDATE itemmastertbl set ItemCode = ?,Description = ?,Unit = ?,Inventory = ?,ActualCost = ?,TotalValue = ?,CategoryId = ? WHERE ItemId = ?";

  var updateData =   [ItemCode,Description,Unit,Inventory,ActualCost,TotalValue,CategoryId,ItemId];

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
                    message: result.affectedRows + " Record Updataed",
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

exports.delete_itemMaster = (req, res) => {

  var ItemId = req.params.ItemId;
  
  var sql = "DELETE FROM itemmastertbl WHERE ItemId = ?";

 connection.query(sql,[ItemId], (error,result) => {
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
