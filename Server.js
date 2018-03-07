var express		=require('express');
var app			=express();
var path 		=require('path');
var bodyParser	=require('body-parser');
var mongodb = require("mongodb");
var jwt = require('jsonwebtoken');
var client = mongodb.MongoClient;


var url = "mongodb://wild:DA0mubXch15X3iiL@jdatawild-shard-00-00-wdkf7.mongodb.net:27017,jdatawild-shard-00-01-wdkf7.mongodb.net:27017,jdatawild-shard-00-02-wdkf7.mongodb.net:27017/jDataWild?ssl=true&replicaSet=jDataWild-shard-0&authSource=admin";
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});


client.connect(url, function(err, db) {
	module.exports =  db;
	app.use('/login',require('./routers/loginR.js'))
	app.use('/join',require('./routers/joinR.js'))
	
	// app.use(function(req, res, next) {

	// 	  // check header or url parameters or post parameters for token
	// 	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// 	  // decode token
	// 	  if (token) {

	// 	    // verifies secret and checks exp
	// 	    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
	// 	      if (err) {
	// 	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	// 	      } else {
	// 	        // if everything is good, save to request for use in other routes
	// 	        req.decoded = decoded;   
		  
	// 	        next();
	// 	      }
	// 	    });

	// 	  } else {

	// 	    // if there is no token
	// 	    // return an error
	// 	    return res.status(403).send({ 
	// 	        success: false, 
	// 	        message: 'No token provided.' 
	// 	    });
		    
	// 	  }
	// 	});


	app.use("/country",require('./routers/countryR.js'))
	app.use("/state",require('./routers/stateR.js'))
	app.use('/company',require('./routers/counterR.js'))
	app.use('/industry-sector',require('./routers/industry-sectorR.js'))
	app.use('/industry-sector-level-4',require('./routers/industry-sector-level-4R.js'))
	app.use('/erp',require('./routers/erpR.js'))
	app.use('/crm',require('./routers/crmR.js'))
	app.use('/info',require('./routers/infoR.js'))
	app.use('/forgot-password',require('./routers/forgotR.js'))
	app.use('/article',require('./routers/articleR.js'))
	app.use('/information',require('./routers/informationR.js'))
	app.use('/selection',require('./routers/selectionR.js'))
	app.use('/decisionmaker',require('./routers/decisionmakerR.js'))
    app.use('/dmbypriority',require('./routers/dmbypriorityR.js'))
    app.use('/prioritytext',require('./routers/prioritytextR.js'))



})//end of connection



	//	module.exports = app;
app.listen(process.env.PORT);


