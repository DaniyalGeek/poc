	var express		=require('express'); 
 			var app			=express();    
 			var crudR		=express.Router(); 
 			var crudC		=require('./../controllers/infoC.js')();
 			crudR.route('/')
 				.get(crudC.get)
            crudR.route('/:id')
                .get(crudC.getOne)
 		module.exports=crudR;