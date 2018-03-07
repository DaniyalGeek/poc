var db = require('../Server');
var bitcoin =function (){ 
 					var get=function (req,res) {
                                db.collection("sic_division").find({}).sort({"_id" : 1.0}).toArray(function(err, result) {
                                    if (err) throw err;
                                  //  console.log(result )
                                    var arr = []
                                    var count = 0;
                                    repeater(count)
                                        function repeater(obj){
                                         console.log(result[obj]._id)
                                                db.collection("sic_majorgroup").find({sic_division_id:result[obj]._id}).sort({"_id" : 1.0}).toArray(function(err, resultMajor) {
                                                        if (err) throw err;
                                                        // res.json(result )
                                                    //    console.log(result[count])
                                                        arr.push({data:result[count],result:resultMajor})
                                                        count++
                                                        if(count < result.length)
                                                            repeater(count)
                                                        else
                                                            res.json(arr)
                                                       
                                                         
                                                  });
                                         }
                                                 
                                     
                            
                                     
                              });
 					} 
 
 					return {  
 						get: 	get  
 					  
 					}  
 				} 

 				module.exports=bitcoin;  
 			