var db = require('../Server');
var mongo = require('mongodb');


var bitcoin =function (){ 
 					var get=function (req,res){ 
 					    
 							db.collection("function").find({}).toArray(function(err, result) {
                                    if (err) throw err;
                                  //  console.log(result);
                                  //  db.close();
                                  res.json(result )
                                  });
 							}; 
 
 					return {  
 						get: 	get,  

 					}  
 				}  
 				module.exports=bitcoin;  
 			