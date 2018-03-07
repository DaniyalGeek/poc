
    var express     =require('express'); 
            var app         =express();    
            var crudR       =express.Router(); 
            var crudC       =require('./../controllers/decisionmakerC.js')();
            crudR.route('/')
                .get(crudC.get)
                .post(crudC.post)
            crudR.route('/:id')
                .get(crudC.getOne)
        module.exports=crudR;
