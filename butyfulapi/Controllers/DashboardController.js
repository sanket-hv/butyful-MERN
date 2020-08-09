var connection = require("./../config");
const format = require('dateformat');
const { changeUser } = require("./../config");

let tDate = new Date(); 

let todayDate = format(tDate,'yyyy-mm-dd');

exports.get_todayProduction_upto = (req,res) => {
    

    let sql = "SELECT MAX(ProductionTime) as time from productiontbl where ProductionDate = ?"

    connection.query(sql,todayDate,(error,results) => {
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
                if(results[0].time != null)
                {    
                    var data = {
                        status: true,
                        date:todayDate,
                        time:results[0].time
                    };
                    return res.status(200).json(data);
                }
                else
                {
                    var data = {
                        status: true,
                        date:todayDate,
                        time:"0"
                      };
                    return res.status(200).json(data);
                }
            }
            else
            {
                var data = {
                    status: false,
                    message:"No Data Found"
                  };
                return res.status(200).json(data);
            }
        }
    })
};

exports.get_todayTotalMasterBOx = (req,res) => {
    

    let sql = "SELECT SUM(MasterBox) as totalMasterBox from productiontbl where ProductionDate = ?"

    connection.query(sql,todayDate,(error,results) => {
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
                
                if(results[0].totalMasterBox != null)
                {    
                    var data = {
                        status: true,
                        date:todayDate,
                        MasterBox:results[0].totalMasterBox
                    };
                    return res.status(200).json(data);
                }
                else
                {
                    var data = {
                        status: true,
                        date:todayDate,
                        MasterBox:"0"
                      };
                    return res.status(200).json(data);
                }
            }
            else
            {
                var data = {
                    status: false,
                    message:"No Data Found"
                  };
                return res.status(200).json(data);
            }
        }
    })
};

exports.get_TotalMasterBOx = (req,res) => {
    

    let sql = "SELECT SUM(MasterBox) as totalMasterBox from productiontbl"

    connection.query(sql,todayDate,(error,results) => {
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
                
                if(results[0].totalMasterBox != null)
                {    
                    var data = {
                        status: true,
                        MasterBox:results[0].totalMasterBox
                    };
                    return res.status(200).json(data);
                }
                else
                {
                    var data = {
                        status: true,
                        MasterBox:"0"
                      };
                    return res.status(200).json(data);
                }
            }
            else
            {
                var data = {
                    status: false,
                    message:"No Data Found"
                  };
                return res.status(200).json(data);
            }
        }
    })
};

exports.get_todayTotalTableWiseProduction = (req,res) => {
    

    let sql = "SELECT tbnotbl.TblNo,SUM(productiontbl.MasterBox) as totalMasterBox FROM tbnotbl  LEFT JOIN productiontbl ON productiontbl.TblId = tbnotbl.TblId AND productiontbl.ProductionDate = ?  GROUP BY tbnotbl.TblId "

    connection.query(sql,todayDate,(error,results) => {
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
                let newObj = [];
                let tableno = [];
                let totalMasterBox = [];
                
                for(var i = 0; i < results.length; i++)
                {
                    if(results[i].totalMasterBox == null)
                    {
                        results[i].totalMasterBox = 0;
                    }

                    tableno[i] = results[i].TblNo;
                    totalMasterBox[i] = results[i].totalMasterBox;
                    
                }

                    var data = {
                        status: true,
                        TableNo:tableno,
                        MasterBox:totalMasterBox
                    };
                    return res.status(200).json(data);
                
                
            }
            else
            {
                var data = {
                    status: false,
                    message:"No Data Found"
                  };
                return res.status(404).json(data);
            }
        }
    })
};

exports.get_FG_Stock_Report = (req,res) => {
    

//    let sql = "SELECT itemmastertbl.ItemId,itemmastertbl.Description,SUM(productiontbl.MasterBox) as totalMasterBox FROM itemmastertbl LEFT JOIN productiontbl ON itemmastertbl.ItemId = productiontbl.ItemId AND productiontable.ProductionDate = ? GROUP BY itemmastertbl.ItemId"
let sql = "SELECT itemmastertbl.ItemId,itemmastertbl.Description,SUM(productiontbl.MasterBox) as totalMasterBox FROM itemmastertbl LEFT JOIN productiontbl ON itemmastertbl.ItemId = productiontbl.ItemId AND productiontbl.ProductionDate = ? GROUP BY itemmastertbl.ItemId "

    connection.query(sql,[todayDate],(error,results) => {
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
                let newObj = [];
                
                for(var i = 0; i < results.length; i++)
                {
                    if(results[i].totalMasterBox == null)
                    {
                        results[i].totalMasterBox = 0;
                    }

                    newObj.push({
                        
                        ItemId:results[i].ItemId,
                        Description:results[i].Description,
                        MasterBox:results[i].totalMasterBox
                    })
                }

                    var data = {
                        status: true,
                        StockReport:newObj
                    };
                    return res.status(200).json(data);
                
                
            }
            else
            {
                var data = {
                    status: false,
                    message:"No Data Found"
                  };
                return res.status(404).json(data);
            }
        }
    })
};


exports.get_ProductionTrend = (req,res) => {
    
    connection.query("SELECT * FROM tbnotbl", (err, result) => {
        if(err){
            var data = {
                status: false,
                message: error.message,
              };
              return res.status(500).json(data);
        }
        else
        {
            if(result.length > 0)
            {
                
                let sql = "SELECT productiontbl.ProductionDate,tbnotbl.TblNo,SUM(productiontbl.MasterBox) as totalMasterBox FROM productiontbl,tbnotbl WHERE productiontbl.TblId = tbnotbl.TblId GROUP BY tbnotbl.TblId,productiontbl.ProductionDate ORDER BY productiontbl.ProductionDate DESC"
              

                connection.query(sql,(error,results) => {
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
                            var newObj = [];
                            
                            var dates = [];
                            

                            for(var i = 0; i < 30; i++){
                                let now = new Date()
                                let last30days = new Date(now.setDate(now.getDate() - i))
                                let formetDate = format(last30days,"dd-mm-yyyy")
                                dates[i] = formetDate;
                              }

                                                             

                              for(var i = 0; i < result.length; i++)
                              {
                                  var tableArray = [];

                                  for(var j = 0; j < 30; j++)
                                  {
                                    tableArray[j] = 0;
                                  }
                                  newObj.push({
                                      tables:result[i].TblNo,
                                      tableArray:tableArray
                                  })
                              }
                            
                            
                              for(var i=0; i < results.length; i++)
                              {
                                  var dateIndex = -1;
                                  for(var j = 0; j < 30; j++)
                                  {
                                      var ChangeDate = results[i].ProductionDate;
                                      var ChangeDateFormat = format(ChangeDate,"dd-mm-yyyy");

                                      if(dates[j] == ChangeDateFormat)
                                      {
                                          dateIndex = j;
                                          break;
                                      }
                                  }
                                  var tableindex = -1;
                                  for(var j = 0; j < newObj.length; j++){
                                      if(newObj[j].tables == results[i].TblNo){
                                          tableindex = j;
                                          break;
                                      }
                                  }
                                  if(dateIndex == -1 || tableindex == -1){
                                      continue;
                                  }
                                    newObj[tableindex].tableArray[dateIndex] = results[i].totalMasterBox; 
                              }
                           
                              var data = {
                                status: true,
                                date:dates,
                                Data:newObj
                              };
                              
                            return res.status(200).json(data);

                        }
                        else
                        {
                            var data = {
                                status: false,
                                message:"No Data Found"
                              };
                            return res.status(404).json(data);
                        }
                    } 
                });            

            }
        }
    });

};

exports.get_ProductionTrendTableWise = (req,res) => {
    let tno = req.params.tableno;
    connection.query("SELECT * FROM tbnotbl", (err, result) => {
        if(err){
            var data = {
                status: false,
                message: error.message,
              };
              return res.status(500).json(data);
        }
        else
        {
            if(result.length > 0)
            {
                
                let sql = "SELECT productiontbl.ProductionDate,tbnotbl.TblNo,SUM(productiontbl.MasterBox) as totalMasterBox FROM productiontbl,tbnotbl WHERE productiontbl.TblId = tbnotbl.TblId AND tbnotbl.TblId = ? GROUP BY productiontbl.ProductionDate ORDER BY productiontbl.ProductionDate DESC"

                connection.query(sql,[tno],(error,results) => {
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
                            var newObj = [];
                            
                            var dates = [];
                            

                            for(var i = 0; i < 30; i++){
                                let now = new Date()
                                let last30days = new Date(now.setDate(now.getDate() - i))
                                let formetDate = format(last30days,"dd-mm-yyyy")
                                dates[i] = formetDate;
                              }

                                                             

                              for(var i = 0; i < result.length; i++)
                              {
                                  var tableArray = [];

                                  for(var j = 0; j < 30; j++)
                                  {
                                    tableArray[j] = 0;
                                  }
                                  newObj.push({
                                      tables:result[i].TblNo,
                                      tableArray:tableArray
                                  })
                              }
                            
                            
                              for(var i=0; i < results.length; i++)
                              {
                                  var dateIndex = -1;
                                  for(var j = 0; j < 30; j++)
                                  {
                                      var ChangeDate = results[i].ProductionDate;
                                      var ChangeDateFormat = format(ChangeDate,"dd-mm-yyyy");

                                      if(dates[j] == ChangeDateFormat)
                                      {
                                          dateIndex = j;
                                          break;
                                      }
                                  }
                                  var tableindex = -1;
                                  for(var j = 0; j < newObj.length; j++){
                                      if(newObj[j].tables == results[i].TblNo){
                                          tableindex = j;
                                          break;
                                      }
                                  }
                                  if(dateIndex == -1 || tableindex == -1){
                                      continue;
                                  }
                                    newObj[tableindex].tableArray[dateIndex] = results[i].totalMasterBox; 
                              }
                           
                              var data = {
                                status: true,
                                date:dates,
                                Data:newObj
                              };
                              
                            return res.status(200).json(data);

                        }
                        else
                        {
                            var data = {
                                status: false,
                                message:"No Data Found"
                              };
                            return res.status(404).json(data);
                        }
                    } 
                });            

            }
        }
    });

};


exports.search_By_Description_and_Category = (req,res) => {

    const CategoryId = req.body.CategoryId;
    const ItemId = req.body.ItemId;
    
    if(ItemId != null && CategoryId != null)
    {
        let sql = "";
        let SearchData = [];
        if(ItemId > 0 && CategoryId > 0)
        {
            sql = "SELECT * FROM itemmastertbl WHERE ItemId = ? AND CategoryId = ?";
            SearchData = [ItemId,CategoryId];
        }
        else if(CategoryId > 0 && ItemId == 0){
            sql = "SELECT * FROM itemmastertbl WHERE CategoryId = ?";
            SearchData = [CategoryId];
        }
        else if(ItemId > 0 && CategoryId == 0){
            sql = "SELECT * FROM itemmastertbl WHERE ItemId = ?";
            SearchData = [ItemId];
        }
        else
        {
            sql = "SELECT * FROM itemmastertbl";
        }

        connection.query(sql,SearchData, (error,results) => {
            if(error)
            {
                    var data = {
                        status: false,
                        message: error.message,
                      };
                      return res.status(500).json(data);
            }
            else{
                if(results.length > 0)
                {
                    var data = {
                         status:true,
                         items:results
                    }
                    return res.status(200).json(data);
                }
                else
                {
                    var data = {
                        status:false,
                        message:"No data found"
                    }
                    return res.status(500).json(data);
                }
            }
        });

    }
    else{
        var data = {
            status:false,
            message:"No data found"
        }

        return res.status(500).json(data);
    }
};

exports.get_Items_By_Category = (req,res) => {

    const CategoryId = req.body.CategoryId;

    let sql = "";
    let SearchData = [];

    if(CategoryId != null || CategoryId != undefined)
    {
        if(CategoryId > 0)
        {
            sql = "SELECT ItemId,Description FROM itemmastertbl WHERE CategoryId = ?";
            SearchData = [CategoryId];
        }
        else{
            sql = "SELECT ItemId,Description FROM itemmastertbl";
        }

        connection.query(sql,SearchData, (error,results) => {
            if(error)
            {
                    var data = {
                        status: false,
                        message: error.message,
                      };
                      return res.status(500).json(data);
            }
            else{

                if(results.length > 0)
                {
                    var data = {
                         status:true,
                         items:results
                    }

                    return res.status(200).json(data);

                }
                else
                {
                    var data = {
                        status:false,
                        message:"No data found"
                    }

                    return res.status(500).json(data);
                }

            }
        });


    }
    else
    {
        var data = {
            status:false,
            message:"No data found"
        }

        return res.status(500).json(data);
    }

};



// let newObj = [];
                
// for(var i = 0; i < results.length; i++)
// {
    
//     let tempDate1 = results[i].ProductionDate;
//     let productionDate1 = format(tempDate1,'dd-mm-yyyy');

//     var tabledata = [];

//     for(var j = 0; j < results.length; j++)
//     {
//         let temp1 = results[j].ProductionDate;
//         let pd2 = format(temp1,'dd-mm-yyyy');

//         if(productionDate1 == pd2)
//         {
//             var tn = results[j].TblNo
//             tabledata.push({
//                 tn:results[j].totalMasterBox                                                                
//             });
//         }
//     }


//     let flag = 0;

//     for(var x = 0; x < newObj.length; x++)
//     {
//         let ProductionDate3 = newObj[x].ProductionData[0].ProductionDate
        
//         console.log(newObj[x].ProductionData[0].ProductionDate)
//         if(productionDate1 == ProductionDate3)
//         {
//             flag = 1;
//         }
//     }

//     if(flag == 0)
//     {
//         newObj.push({
//             ProductionDate:productionDate1,
//             ProductionData:tabledata
//         })
//     }

// }

//     var data = {
//         status: true,
//         Production:newObj
//     };
//     return res.status(200).json(data);





// var newObj = [];
//     var tableno = [];
//     var Tabledata = {};

//     Tabledata["date"] = ""
// for(var i = 0; i < result.length; i++)
// {
//     tableno[i] = result[i].TblNo
//     Tabledata[result[i].TblNo] = 0;
// }
// console.log(tableno)

//     let TData = new Map()
//     TData.set("date","")
    

// for(var i = 0; i < results.length; i++)
// {
    
//      let tempDate1 = results[i].ProductionDate;
//      let productionDate1 = format(tempDate1,'dd-mm-yyyy');

//     for(var j = 0; j < results.length; j++)
//     {
//         let tempDate2 = results[j].ProductionDate;
//         let productionDate2 = format(tempDate2,'dd-mm-yyyy');

//         if(productionDate1 == productionDate2)
//         {
//             Tabledata["date"] = productionDate1
//             Tabledata[results[j].TblNo] = results[j].totalMasterBox
//         }
//     }
//     console.log(Tabledata)

//     var Tabledata = {};

//     Tabledata["date"] = ""
//     for(var i = 0; i < result.length; i++)
//     {
//         Tabledata[result[i].TblNo] = 0;
//     }
//     newObj.push(Tabledata)


// }

//     console.log("------------------")
//     console.log(newObj)