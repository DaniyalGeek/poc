var db = require('../Server');
var mongo = require('mongodb');
var jwt = require('jsonwebtoken');

var bitcoin =function (){ 
 					var get=function (req,res){ 
 					    
 							db.collection("user").find({}).toArray(function(err, result) {
                                    if (err) throw err;
                                    console.log(result);
                                  //  db.close();
                                  res.json(result )
                                  });
 							}; 
 					var post=function (req,res){ 
 					    			 db.collection("user").findOne({"us_email": req.body.us_email}, function(err, user) {
                                            if (err) throw err;
                                           
											    if (!user) {
											      res.json({ success: false, message: 'Authentication failed. User not found.' });
											    } else if (user) {

											      // check if password matches
											      if (user.us_paswrd != req.body.us_paswrd) {
											        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
											      } else {
														   var token = jwt.sign({email:user.us_email,password:user.us_paswrd}, 'superSecret', {
																         
																        });
											        // return the information including token as JSON
											        res.json({
											          success: true,
											        	data:user,
											        	token:token			
											        });
											      }   

											    }
                                           
                                          }); 
 					
 									 	

 							}; 
 					var getOne=  function (req,res){ 
 					   
 					  
 										 db.collection("user").findOne({"us_email": req.params.id}, function(err, user) {
                                            if (err) throw err;
                                           
											    if (!user) {
											      res.json({ success: false, message: 'Authentication failed. User not found.' });
											    } else if (user) {

											      // check if password matches
											      if (user.password != req.body.password) {
											        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
											      } else {
														   var token = jwt.sign({email:user.email,password:user.password}, 'superSecret', {
																         
																        });
											        // return the information including token as JSON
											        res.json({
											          success: true,
											        	data:user,
											        	token:token			
											        });
											      }   

											    }
                                           
                                          }); 
 								};  
 					
 					var put=function (req,res){  
 							db.collection("user").updateOne({"_id": new mongo.ObjectID(req.params.id)}, req.body, function(err, result) {
                                    if (err) throw err;
                                    res.json({success:true})
                                   
                                  }); 
 							};  
 					var del=function (req,res){  
 										db.collection("user").destroy({name:req.params.id}).exec(function (err){  
 										if(err){  
 											res.status(500).send(err);  
 										}else{  
 											res.send('User with id: '+req.params.id+' has been deleted');  
 										}  
 									});  
 								};  
 					return {  
 						get: 	get,  
 						post: 	post,  
 						getOne: getOne,  
 						put: 	put,  
 						delete: del  
 					}  
 				}  
 				module.exports=bitcoin;  
 			