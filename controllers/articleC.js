var db = require('../Server');
var bitcoin =function (){ 
 					var get=function (req,res) {
                        
                                
                        db.collection("article").find({}).sort({"ar_sort" : 1.0}).toArray(function(err, result) {
                                    if (err) throw err;
                                //    console.log(result);
                                  //  db.close();
                                  res.json(result )
                                  });
            	      
 					} 
 					var getOne=function (req,res) {
                        
                                
                        db.collection("article").find({ar_category:req.params.id}).sort({"ar_sort" : 1.0}).toArray(function(err, result) {
                                    if (err) throw err;
                                  //  console.log(result);
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
 			