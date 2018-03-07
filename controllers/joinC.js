var db = require('../Server');
var mongo = require('mongodb');
var jwt = require('jsonwebtoken');

var bitcoin =function (){ 
 					var get=function (req,res){ 
 					    
 							db.collection("user").find({}).toArray(function(err, result) {
                                    if (err) throw err;
                                  //  console.log(result);
                                  //  db.close();
                                  res.json(result )
                                  });
 							}; 
 					var post=function (req,res){ 
 					        if(req.body.us_socialid){
 					            
                                    db.collection("user").findOne({"us_socialid": req.body.us_socialid}, function(err, result) {
                                         //  console.log(req.body)
                                           if(result){
                                           //    console.log(result)
                                               res.json({data:result,success:true,message:"Thanks for login!"})
                                           }else{
                                               
                                                   db.collection("user").insertOne(req.body, function(err, result) {
     									     
                                                        if (err) throw err;
                                                     //   console.log(result)
                                                       res.json({data:result,success:true,message:"User has be created."})
                    
                                                      });
                                           
                                              
                                           }
                                           
                                          }); 
                                                  }
 					   	if(req.body.us_email){
 					   	 db.collection("user").findOne({"us_email": req.body.us_email}, function(err, result) {
                                         //  console.log(req.body)
                                           if(result){
                                           //    console.log(result)
                                               res.json({success:false,message:"User already exist"})
                                           }else{
                                               
                                                   db.collection("user").insertOne(req.body, function(err, result) {
     									     
                                                        if (err) throw err;
                                                       res.json({success:true,message:"User has be created."})
                    
                                                      });
                                           
                                              
                                           }
                                           
                                          }); 
                                          
 					   	}
 					
 									 	

 							}; 
 			// 		var getOne=  function (req,res){ 
 					   
 					  
 			// 							 db.collection("user").findOne({"us_email": req.params.id}, function(err, user) {
    //                                         if (err) throw err;
                                           
				// 							    if (!user) {
				// 							      res.json({ success: false, message: 'Authentication failed. User not found.' });
				// 							    } else if (user) {

				// 							      // check if password matches
				// 							      if (user.password != req.body.password) {
				// 							        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				// 							      } else {
				// 										   var token = jwt.sign({email:user.email,password:user.password}, 'superSecret', {
																         
				// 												        });
				// 							        // return the information including token as JSON
				// 							        res.json({
				// 							          success: true,
				// 							        	data:user,
				// 							        	token:token			
				// 							        });
				// 							      }   

				// 							    }
                                           
    //                                       }); 
 			// 					};  
 					
 					var put=function (req,res){  
 							db.collection("user").update({"_id": new mongo.ObjectID(req.params.id)}, { $set:req.body}, function(err, result) {
                                    if (err) throw err;
                                   // console.log(result)
                   db.collection("user").findOne({"_id": new mongo.ObjectID(req.params.id)}, function(err, user) {
                     res.json({success:true,message:"Thanks! Your profile has been updated.",data:user})
                    
                   })
                                   
                                   
                                  }); 
 							};  
 			// 		var del=function (req,res){  
 			// 							db.collection("user").destroy({name:req.params.id}).exec(function (err){  
 			// 							if(err){  
 			// 								res.status(500).send(err);  
 			// 							}else{  
 			// 								res.send('User with id: '+req.params.id+' has been deleted');  
 			// 							}  
 			// 						});  
 			// 					};  
 					return {  
                        get:get,
 						post: 	post,
 						put: put
  
 					}  
 				}  
 				module.exports=bitcoin;  
 			
 			
 				
				  // db.collection('company').aggregate([
						// 		 { $match: mainObject },
      //                           { $lookup:
      //                              {
      //                                from: 'person',
      //                                localField: '_id',
      //                                foreignField: 'co_id',
      //                                as: 'persons'
      //                              }
      //                            }
      //                           ], function(err, result) {
      //                           if (err) throw err;
      //                           res.json(result);
      //                      //  console.log(JSON.stringify(res))
                               
      //                         }); 