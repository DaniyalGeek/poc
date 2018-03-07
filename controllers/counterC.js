var db = require('../Server');
var bitcoin =function (){ 
 				var post=function (req,res) {
 				console.log(JSON.stringify(req.body))  
			var collection = db.collection("company");
			var obj = req.body
			
			var orForMainCountry =[]
			var mainObject = {}
		//	 console.log(obj)	    
			// if(obj == {}){
				
			// }
			// else{
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
	
	    	mainObject.co_turnover=  { $gte: parseFloat(req.body.turnoverFrom)} 
	    }
	    if (req.body.turnoverTo){
	
	    	mainObject.co_turnover=  { $lt:parseFloat(req.body.turnoverTo)} 
	    }
	     if (req.body.turnoverFrom && req.body.turnoverTo){
	
	    	mainObject.co_turnover=  { $gte: parseFloat(req.body.turnoverFrom), $lt:  parseFloat(req.body.turnoverTo)} 
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
	    		 //console.log(req.body.sectors)
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
	    	str = str.replace(/\s/g, '')
	    	str = str.replace(/-/g, ',')
	    	 //console.log(req.body.co_poscode)
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
	    //	console.log(str)
	    	var arr  = []
	    	var object = {}
	    	for(obj in str){
	    	//	console.log(str[obj].id)
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
			if(isEmpty(mainObject)){
			console.log("i am empty")	
				res.json({result:"0",price:"0"})
			}
			else{
				    	collection.count(mainObject,function(err,resultCount){
					    	  var post_query = new Date().getTime();
							  var duration = (post_query - pre_query);
							     db.collection("pricebook").find({_id:"company"}).toArray(function(err, result) {
									    if (err) throw err;
									    //	console.log(result[0]);
											var value = closest (resultCount, Object.keys(result[0].price))
										
											var price = result[0].price[value]
										res.json({result:resultCount,price:price,queryTime:duration})
									  
									  });
					    	 
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