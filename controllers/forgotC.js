var db = require('../Server');
var mongo = require('mongodb');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// Create a token generator with the default settings:
var randtoken = require('rand-token');

// Generate a 16 character alpha-numeric token:

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

                                              var transporter = nodemailer.createTransport(smtpTransport({
                                                service: 'gmail',
                                                auth: {
                                                        user: 'withease.org@gmail.com', // generated ethereal user
                                                        pass: 'Iampakistan'
                                                }
                                            }));

 									  db.collection("user").findOne({"us_email": req.body.us_email},function(err,data){

	 									if(err){
	 										res.status(500).send(err);
	 									}else{

	 									    if(data){
	 									        var token = randtoken.generate(16);
	 									        	db.collection("user").update({"_id": new mongo.ObjectID(data._id)}, { $set:{forgot_id:token}}, function(err, result){
	 									        	   }); 
                                                var mailOptions = {
                                                  from: 'youremail@gmail.com',
                                                  to: data.us_email,
                                                  subject: 'Password reset notification',
                                                  html: '<table cellspacing="0" cellpadding="0"><tr><td align="center" width="300" height="40" bgcolor="#000091" style="-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: #ffffff; display: block;"><a href="https://poc-withease.c9users.io?forgot='+token+'" style="font-size:16px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; text-decoration: none; line-height:40px; width:100%; display:inline-block"><span style="color: #FFFFFF">Click here to reset password.</span></a></td></tr></table>'}

                                                transporter.sendMail(mailOptions, function(error, info){
                                                  if (error) {
                                                    console.log(error);
                                                  } else {
                                                    console.log('Email sent: ' + info.response);
                                                  }
                                                });

	 										    res.json({success:true,result:'user founded'});
	 									    }
	 										else
	 											res.json({success:false,result:'user not found'});
	 									}
	 									});
 							}; 
 							var put = function(req,res){
 							     db.collection("user").findOne({"forgot_id": req.params.id},function(err,data){

	 									if(err){
	 										res.status(500).send(err);
	 									}else{
	 									    if(data){
                                                	db.collection("user").update({"_id": new mongo.ObjectID(data._id)}, { $set:{us_paswrd:req.body.us_paswrd}}, function(err, result){
	 									                	 res.json({success:true,result:'Password has been updated.'});
	 									        	   });
	 									    }else{
	 									        	res.json({success:false,result:'Token is not validated'});
	 									    }
	 									}
	 									});
 							}
 					

 
 					return {  
                        // get:get,
 						post: 	post,
 			 			put: put
  
 					}  
 				}  
 				module.exports=bitcoin;  
 			