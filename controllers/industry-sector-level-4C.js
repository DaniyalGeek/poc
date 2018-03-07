var db = require('../Server');
var bitcoin =function (){ 
 					var get=function (req,res) {
 	
                       
                                
                        db.collection("sic_industrygroup").find({}).toArray(function(err, result) {
                                    if (err) throw err;
                                //    console.log(result);
                                  //  db.close();
                                  res.json(result )
                                  });
            	      
 					} 
 					var getOne=function (req,res) {
                         console.log(req.params)
                                
                        db.collection("sic_industrygroup").find({sic_division_id:req.params.divisionid,sic_majorgroup_id:parseInt(req.params.majorgroupid)}).sort({"_id" : 1.0}).toArray(function(err, result) {
                                    if (err) throw err;
                              
                                    var arr = []
                                    var count = 0;
                                    repeater(count)
                                        function repeater(obj){
                                        //  console.log(result[obj]._id)
                                                db.collection("sic_code").find({sic_industrygroup_ID:result[obj]._id}).sort({"_id" : 1.0}).toArray(function(err, resultMajor) {
                                                        if (err) throw err;
                                                        // res.json(result )
                                                   //     console.log(result[count])
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
 						get: 	get ,
 						getOne:getOne
 					  
 					}  
 				} 

 				module.exports=bitcoin;  
 			