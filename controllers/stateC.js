var db = require('../Server');
var bitcoin =function (){ 
 					var get=function (req,res) {
                        
                                
                        db.collection("state").find({}).toArray(function(err, result) {
                                    if (err) throw err;
                                 //   console.log(result);
                                  //  db.close();
                                  res.json(result )
                                  });
            	      
 					} 
 					var getOne=function (req,res) {
                        
                                
                        db.collection("state").find({country_id:req.params.id}).sort({"_id" : 1.0}).toArray(function(err, result) {
                                    if (err) throw err;
                                 //   console.log(result);
                                  //  db.close();
                                  res.json(result )
                                  });
            	      
 					} 
 
 					return {  
 						get: 	get ,
 						getOne:getOne
 					  
 					}  
 				} 

 				module.exports=bitcoin;  
 			