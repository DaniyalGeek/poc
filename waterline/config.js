var mysqlAdapter = require('sails-mongo');

module.exports = {


  connections: {
    mysqlDB: {
    adapter: 'sails-mongo',
    url:  'mongodb://poc:meanstack@bdshop-shard-00-00-\
4amab.mongodb.net:27017,bdshop-shard-00-01-4amab.mongodb.net:27017,bdshopshard-00-02-4amab.mongodb.net:27017/jData?ssl=true&replicaSet=BDSHOP-shard-\
0&authSource=admin'
  }
  }
};

// var mysqlAdapter = require('sails-mysql');

// module.exports = {
// 	adapters: {
// 		mysqlAdapt: mysqlAdapter
// 	},

//   connections: {
//     mysqlDB: {
// 		adapter: 'mysqlAdapt',
// 		host: 'localhost',
// 		port: '3306',
// 		database: 'bsit',
// 		user:'root',
// 		password:'',
// 		supportBigNumbers:true, //true/false
// 		debug:['ComQueryPacket'], //false or array of node-mysql debug options
// 		trace:true //true/false
//     } 
//   }
// };
