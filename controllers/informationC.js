var db = require('../Server');
async = require("async");
 
// Array to hold async tasks
var asyncTasks = [];

var bitcoin =function (){ 
	  var value 
	  var price
	  var qur
	  var otherObject
	  var arr1 =[]
	  var newMainObject = {}
 				var post=function (req,res) {
 		    console.log(req.body)
 		    console.log("i am body")
 		    	 arr1 =[]
				newMainObject = {}
			var collection = db.collection("company");
			var obj = req.body
			
			var orForMainCountry =[]
			var mainObject = {}
				    
	
			if(obj.countries)
			{
				if(obj.countries.length>0)
				{
					var pre_query = new Date().getTime();
				    for(object in obj.countries){
					    	var andForCountryAndStates ={}
					    	var statePostObject = {};
							var countryPostObject = {};
							var countryPostArr = []
					    	var stateArr = obj.countries[object].states
					   if(stateArr){
					    	if(stateArr.length>0){
					    		var filterArray = []
						    	for(state in stateArr){
						    		var filterObject = {}
						    		filterObject.co_state= stateArr[state]._id
					 	    		filterArray.push(filterObject)
						    	}
						    		
				 	    		statePostObject["$or"] = filterArray
				 	    		countryPostArr.push(statePostObject)
							
					    	}// end of if 	if(stateArr.length>0)
				    }
					    	countryPostObject.co_country = obj.countries[object]._id
					    	countryPostArr.push(countryPostObject)
					    	andForCountryAndStates["$and"] = countryPostArr
					    	orForMainCountry.push(andForCountryAndStates)
				    	
				    	}//end of main for loop
				    
				    	mainObject["$or"] = orForMainCountry
				    
				}//if country obj >0 
			  
			}
			  if (req.body.employeeFrom){
	
	    	mainObject.co_countemployee=  { $gte: parseInt(req.body.employeeFrom)} 
	    }
	    if (req.body.employeeTo){
	
	    	mainObject.co_countemployee=  { $lt: parseInt(req.body.employeeTo)} 
	    }
	     if (req.body.employeeFrom && req.body.employeeTo){
	
	    	mainObject.co_countemployee=  { $gte: parseInt(req.body.employeeFrom), $lt:  parseInt(req.body.employeeTo)} 
	    }
	    //turnover condition
	    if (req.body.turnoverFrom){
	
	    	mainObject.co_turnover=  { $gte: parseInt(req.body.turnoverFrom)} 
	    }
	    if (req.body.turnoverTo){
	
	    	mainObject.co_turnover=  { $lt:parseInt(req.body.turnoverTo)} 
	    }
	     if (req.body.turnoverFrom && req.body.turnoverTo){
	
	    	mainObject.co_turnover=  { $gte: parseInt(req.body.turnoverFrom), $lt:  parseInt(req.body.turnoverTo)} 
	    }
	    //founddate condition

	    if (req.body.foudateFrom){
	
	    	mainObject.co_foudate=  { $gte: parseFloat(req.body.foudateFrom)} 
	    }
	    if (req.body.foudateTo){
	
	    	mainObject.co_foudate=  { $lt: parseFloat(req.body.foudateTo)} 
	    }
	     if (req.body.foudateFrom && req.body.foudateTo){
	
	    	mainObject.co_foudate=  { $gte: parseFloat(req.body.foudateFrom), $lt:  parseFloat(req.body.foudateTo)} 
	    }
	    //count pc 
	    
	    if (req.body.countpcFrom){
	
	    	mainObject.co_countpc=  { $gte:parseInt(req.body.countpcFrom)} 
	    }
	    if (req.body.countpcTo){
	
	    	mainObject.co_countpc=  { $lt: req.body.countpcTo} 
	    }
	     if (req.body.countpcFrom && req.body.countpcTo){
	
	    	mainObject.co_countpc=  { $gte: parseInt(req.body.countpcFrom), $lt:  parseInt(req.body.countpcTo)} 
	    }
	    
	    if(req.body.sectors||req.body.co_poscode ||req.body.co_crm||req.body.co_erp){
	    	var finalQry = []
	    			 if(req.body.sectors){
	    		console.log(req.body.sectors)
				var mainOrObject = {}
				var mainOrArray = []
				for(objSector in req.body.sectors){
					var sectors=req.body.sectors
					var co_sic_div = sectors[objSector].co_sic_div;
				
					var orArry = []
					var andArry = []
					var andArryObject= {}
					var data_major = sectors[objSector].data_major
					var data_inds = sectors[objSector].data_inds
					for(objMajr in data_major){
						var objForMajor = {}
						if(data_major[objMajr].co_sic_majgrp.length<2)
								data_major[objMajr].co_sic_majgrp = '0'+data_major[objMajr].co_sic_majgrp
						objForMajor.co_sic_majgrp =  data_major[objMajr].co_sic_majgrp
						orArry.push(objForMajor)
					}
					for(objInd in data_inds){
						var objForInd = {}
						if(data_inds[objInd].co_sic_indgrp){
							if(data_inds[objInd].co_sic_indgrp.length<=3)
								data_inds[objInd].co_sic_indgrp = '0'+data_inds[objInd].co_sic_indgrp
							objForInd.co_sic_indgrp =  data_inds[objInd].co_sic_indgrp
						}
						if(data_inds[objInd].co_sic4){
							if(data_inds[objInd].co_sic4.length<=3)
								data_inds[objInd].co_sic4 ='0'+ data_inds[objInd].co_sic4
							objForInd.co_sic4 =  data_inds[objInd].co_sic4
						}
						orArry.push(objForInd)
					}
					var orObjectForInnerData = {}
					if(data_inds||data_major){
					orObjectForInnerData["$or"] = orArry
					andArry.push(orObjectForInnerData)
					}
					andArry.push({co_sic_div:co_sic_div})
				
					andArryObject["$and"] = andArry
					
					mainOrArray.push(andArryObject)
					
			
				}
			 mainOrObject["$or"] = mainOrArray
			 finalQry.push(mainOrObject)
			// console.log(JSON.stringify(mainOrObject))

	    }
	    if(req.body.co_poscode){
	    	
	    	var str = req.body.co_poscode
	    	str.replace(/\s/g, '')
		  str = str.replace(/\s/g, '')
	    	str = str.replace(/-/g, ',')
		    var	arr = 	str.split(",");
		    var finalArr =[]
		    for(obj in arr){
		    	finalArr.push({co_poscode:arr[obj]})
			  }
			var qry = {};
			qry["$or"] = finalArr
			
			finalQry.push( qry)
	    		 
	    }
	    if(req.body.co_crm){
	    	var str = req.body.co_crm
	    	var arr  = []
	    	var object = {}
	    	for(obj in str){
	    		arr.push({co_crm:str[obj].id})
	    	}
	    	object["$or"] = arr;
	    	finalQry.push(object)
	    }  
	    if(req.body.co_erp){
	    	var str = req.body.co_erp
	    	var arr  = []
	    	var object = {}
	    	for(obj in str){
	    		arr.push({co_erp:str[obj].id})
	    	}
	    	object["$or"] = arr;
	    	finalQry.push(object)
	    }
	    mainObject["$and"] = finalQry
	    }

			
				console.log(JSON.stringify(mainObject))
				var arr = {}
		
					   
					//    console.log(JSON.stringify(newMainObject))
					    console.log("i am before object")
		if(isEmpty(mainObject)){
			console.log("i am empty")	
				res.json({
					    "co_phone_com": {
					        "result": 0,
					        "price": 0
					       
					    },
					    "co_phone_split": {
					        "result": 0,
					        "price": 0
					    },
					    "co_fax_com": {
					        "result": 0,
					        "price": 0
					    },
					    "co_fax_split": {
					        "result": 0,
					        "price": 0
					    },
					    "co_mail": {
					        "result": 0,
					        "price": 0
					    },
					    "co_web": {
					        "result": 0,
					        "price": 0
					    },
					    "co_countemployee": {
					        "result": 0,
					        "price": 0
					    },
					    "co_turnmover": {
					        "result": 0,
					        "price": 0
					    },
					    "co_sic4": {
					        "result": 0,
					        "price": 0
					    },
					    "co_foudate": {
					        "result": 0,
					        "price": 0
					    },
					    "co_vat": {
					        "result": 0,
					        "price": 0
					    },
					    "co_comnum": {
					        "result": 0,
					        "price": 0
					    },
					    "co_sic_majgrp": {
					        "result": 0,
					        "price": 0
					    },
					    "co_sic_indgrp": {
					        "result": 0,
					        "price": 0
					    },
					    "co_sic_div": {
					        "result": 0,
					        "price": 0
					    },
					    "all": {
					        "result": 0,
					        "price": 0
					    },
					    "co_bas": {
					        "result": 0,
					        "price": 0
					    }
					})
			}
			else{		    
				asyncTasks.push(function(callback){
						qur = {co_phocom : {"$ne":""}}
					    otherObject = mainObject
					    newMainObject = {}
					    arr1 = []
					    arr1.push(otherObject)
					    arr1.push(qur)
					    newMainObject["$and"] = arr1
						collection.count(newMainObject,function(err,resultCount){
							 
							     db.collection("pricebook").find({_id:"cinfba"}).toArray(function(err, result) {
									    if (err) throw err;
									    //	console.log(result[0]);
											value = closest (resultCount, Object.keys(result[0].price))
										
											price = result[0].price[value]
								
										arr.co_phone_com={result:resultCount,price:price}
										arr.co_phone_split={result:resultCount,price:price}
									 callback();
									  }); 
					    });
});
asyncTasks.push(function(callback){

						qur = {co_faxcom : {"$ne":""}}
                          otherObject = mainObject
                          newMainObject = {}
                          arr1 = []
                          arr1.push(otherObject)
                          arr1.push(qur)
                          newMainObject["$and"] = arr1
                    //      console.log(JSON.stringify(newMainObject))
                      collection.count(newMainObject,function(err,resultCount){
                               db.collection("pricebook").find({_id:"cinfba"}).toArray(function(err, result) {
                                  if (err) throw err;
                                  //  console.log(result[0]);
                                  value = closest (resultCount, Object.keys(result[0].price))
                                
                                  price = result[0].price[value]
                            
                                arr.co_fax_com={result:resultCount,price:price}
                                arr.co_fax_split={result:resultCount,price:price}
								
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){
qur = {co_web : {"$ne":""}}
	    otherObject = mainObject
	    newMainObject = {}
	    arr1 = []
	    arr1.push(otherObject)
	    arr1.push(qur)
	    newMainObject["$and"] = arr1
//	    console.log(JSON.stringify(newMainObject))
	collection.count(newMainObject,function(err,resultCount){
	    	  
			  
			     db.collection("pricebook").find({_id:"cinfpr"}).toArray(function(err, result) {
					    if (err) throw err;
							value = closest (resultCount, Object.keys(result[0].price))
							price = result[0].price[value]
						arr.co_web={result:resultCount,price:price}
								
									 callback();
									  });
					    	 
					    });
   
});

 
 asyncTasks.push(function(callback){

					    qur = {co_email : {"$ne":""}}
                                          otherObject = mainObject
                                          newMainObject = {}
                                          arr1 = []
                                          arr1.push(otherObject)
                                          arr1.push(qur)
                                          newMainObject["$and"] = arr1
                                      //    console.log(JSON.stringify(newMainObject))
                                      collection.count(newMainObject,function(err,resultCount){
                                              
                                            
                                               db.collection("pricebook").find({_id:"cinfpr"}).toArray(function(err, result) {
                                                  if (err) throw err;
                                                  value = closest (resultCount, Object.keys(result[0].price))
                                                  price = result[0].price[value]
                                                arr.co_mail={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){

					    qur = {co_countemployee : {"$ne":""}}
                              otherObject = mainObject
                              newMainObject = {}
                              arr1 = []
                              arr1.push(otherObject)
                              arr1.push(qur)
                              newMainObject["$and"] = arr1
                          //    console.log(JSON.stringify(newMainObject))
                          collection.count(newMainObject,function(err,resultCount){
                                   db.collection("pricebook").find({_id:"cinfpr"}).toArray(function(err, result) {
                                      if (err) throw err;
                                      value = closest (resultCount, Object.keys(result[0].price))
                                      price = result[0].price[value]
                                    arr.co_countemployee={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){

					    qur = {co_turnover : {"$ne":""}}
                            otherObject = mainObject
                            newMainObject = {}
                            arr1 = []
                            arr1.push(otherObject)
                            arr1.push(qur)
                            newMainObject["$and"] = arr1
                           // console.log(JSON.stringify(newMainObject))
                        collection.count(newMainObject,function(err,resultCount){
                                
                              
                                 db.collection("pricebook").find({_id:"cinfpr"}).toArray(function(err, result) {
                                    if (err) throw err;
                                    value = closest (resultCount, Object.keys(result[0].price))
                                    price = result[0].price[value]
                                  arr.co_turnmover={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){

					   
                                          qur = {co_sic4 : {"$ne":""}}
                                            otherObject = mainObject
                                            newMainObject = {}
                                            arr1 = []
                                            arr1.push(otherObject)
                                            arr1.push(qur)
                                            newMainObject["$and"] = arr1
                                           // console.log(JSON.stringify(newMainObject))
                                        collection.count(newMainObject,function(err,resultCount){
                                                
                                              
                                                 db.collection("pricebook").find({_id:"cinfpr"}).toArray(function(err, result) {
                                                    if (err) throw err;
                                                    value = closest (resultCount, Object.keys(result[0].price))
                                                    price = result[0].price[value]
                                                  arr.co_sic4={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){

					      qur = {co_foudate : {"$ne":""}}
                                  otherObject = mainObject
                                  newMainObject = {}
                                  arr1 = []
                                  arr1.push(otherObject)
                                  arr1.push(qur)
                                  newMainObject["$and"] = arr1
                            //      console.log(JSON.stringify(newMainObject))
                              collection.count(newMainObject,function(err,resultCount){
                                      
                                    
                                       db.collection("pricebook").find({_id:"cinfba"}).toArray(function(err, result) {
                                          if (err) throw err;
                                          value = closest (resultCount, Object.keys(result[0].price))
                                          price = result[0].price[value]
                                        arr.co_foudate={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});

asyncTasks.push(function(callback){

					     
                            qur = {co_vat : {"$ne":""}}
                              otherObject = mainObject
                              newMainObject = {}
                              arr1 = []
                              arr1.push(otherObject)
                              arr1.push(qur)
                              newMainObject["$and"] = arr1
                          //    console.log(JSON.stringify(newMainObject))
                          collection.count(newMainObject,function(err,resultCount){
                                  
                                
                                   db.collection("pricebook").find({_id:"cinfba"}).toArray(function(err, result) {
                                      if (err) throw err;
                                      value = closest (resultCount, Object.keys(result[0].price))
                                      price = result[0].price[value]
                                    arr.co_vat={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){

					     
                                      qur = {co_comnum : {"$ne":""}}
                                        otherObject = mainObject
                                        newMainObject = {}
                                        arr1 = []
                                        arr1.push(otherObject)
                                        arr1.push(qur)
                                        newMainObject["$and"] = arr1
                                      //  console.log(JSON.stringify(newMainObject))
                                    collection.count(newMainObject,function(err,resultCount){
                                            
                                          
                                             db.collection("pricebook").find({_id:"cinfba"}).toArray(function(err, result) {
                                                if (err) throw err;
                                                value = closest (resultCount, Object.keys(result[0].price))
                                                price = result[0].price[value]
                                              arr.co_comnum={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){
                                  qur = {co_sic_majgrp : {"$ne":""}}
                                    otherObject = mainObject
                                    newMainObject = {}
                                    arr1 = []
                                    arr1.push(otherObject)
                                    arr1.push(qur)
                                    newMainObject["$and"] = arr1
                                //    console.log(JSON.stringify(newMainObject))
                                collection.count(newMainObject,function(err,resultCount){
                                        
                                      
                                         db.collection("pricebook").find({_id:"cinfpr"}).toArray(function(err, result) {
                                            if (err) throw err;
                                            value = closest (resultCount, Object.keys(result[0].price))
                                            price = result[0].price[value]
                                          arr.co_sic_majgrp={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){

                                                //new
                                                    qur = {co_sic_indgrp : {"$ne":""}}
                                                      otherObject = mainObject
                                                      newMainObject = {}
                                                      arr1 = []
                                                      arr1.push(otherObject)
                                                      arr1.push(qur)
                                                      newMainObject["$and"] = arr1
                                                  //    console.log(JSON.stringify(newMainObject))
                                                  collection.count(newMainObject,function(err,resultCount){
                                                          
                                                        
                                                           db.collection("pricebook").find({_id:"cinfpr"}).toArray(function(err, result) {
                                                              if (err) throw err;
                                                              value = closest (resultCount, Object.keys(result[0].price))
                                                              price = result[0].price[value]
                                                            arr.co_sic_indgrp={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});

asyncTasks.push(function(callback){
                                qur = {co_sic_div : {"$ne":""}}
                                  otherObject = mainObject
                                  newMainObject = {}
                                  arr1 = []
                                  arr1.push(otherObject)
                                  arr1.push(qur)
                                  newMainObject["$and"] = arr1
                                  //console.log(JSON.stringify(newMainObject))
                              collection.count(newMainObject,function(err,resultCount){
                                      
                                    
                                       db.collection("pricebook").find({_id:"cinfpr"}).toArray(function(err, result) {
                                          if (err) throw err;
                                          value = closest (resultCount, Object.keys(result[0].price))
                                          price = result[0].price[value]
                                        arr.co_sic_div={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});
asyncTasks.push(function(callback){ 
	collection.count(mainObject,function(err,resultCount){
                                               db.collection("pricebook").find({_id:"company"}).toArray(function(err, result) {
                                                  if (err) throw err;
                                                  //  console.log(result[0]);
                                                  value = closest (resultCount, Object.keys(result[0].price))
                                                  price = result[0].price[value]
                                                arr.all={result:resultCount,price:price}
                                                arr.co_bas={result:resultCount,price:price}
									 callback();
									  });
							
					    	 
					    });
   
  
});

// Now we have an array of functions doing async tasks
// Execute all async tasks in the asyncTasks array
async.parallel(asyncTasks, function(){
  // All tasks are done now
 res.json(arr)
});

			
						}
				
                              
 					} 
 
 					return {  
 						post: 	post  
 					  
 					}  
 				} 

 				module.exports=bitcoin;  
 			

function closest (num, arr) {
                for(var i =0; i<arr.length;i++){
                	 if(num>=arr[i]&&num<=arr[i+1])
		                	{
		                		// console.log(arr[i+1])
		                		 return arr[i];
		                	}
		                	 else if(arr[i+1] == undefined){
		                	 	 return arr[i];
		                	 }
                	
                }
              
        }
        
        
 
  




function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}