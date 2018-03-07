	var express		=require('express'); 
 			var app			=express();    
 			var crudR		=express.Router(); 
 			var crudC		=require('./../controllers/industry-sector-level-4C.js')();
 			crudR.route('/')
 				.get(crudC.get)
            crudR.route('/:divisionid/:majorgroupid')
                .get(crudC.getOne)
 		module.exports=crudR;