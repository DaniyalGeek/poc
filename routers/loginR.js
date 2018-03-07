	var express		=require('express'); 
 			var app			=express();    
 			var crudR		=express.Router(); 
 			var crudC		=require('./../controllers/loginC.js')();
 			crudR.route('/')
 				.get(crudC.get)
 				.post(crudC.post)
            crudR.route('/:id')
                .get(crudC.getOne)
                .delete(crudC.delete)
                .put(crudC.put)
 		module.exports=crudR;