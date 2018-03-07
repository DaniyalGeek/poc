var db = require('../Server');
var bitcoin =function (){ 
 					var get=function (req,res) {
                                db.collection("country").find({}).sort({"_id" : 1.0}).toArray(function(err, result) {
                                    if (err) throw err;
                                     res.json(result )
                              });
 					} 
 
 					return {  
 						get: 	get  
 					  
 					}  
 				} 

 				module.exports=bitcoin;  
 			