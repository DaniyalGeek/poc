	var express		=require('express'); 
 			var app			=express();    
 			var crudR		=express.Router(); 
 			var crudC		=require('./../controllers/informationC.js')();
 			crudR.route('/')
 				.post(crudC.post)

 		module.exports=crudR;