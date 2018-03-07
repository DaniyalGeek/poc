var db = require('../Server');
var mongo = require('mongodb');
var nodeUnique = require('node-unique-array')
                       
var unique_array = new nodeUnique();                     
var bitcoin =function (){ 
	var countObject = {}
		var co_cio = 0 //11
                                	var co_cco = 0 //6
                                	var e_com = 0 //40
                                	var co_ciso = 0 //19
                                	var co_ceo = 0 // 1
                                	var cso = 0 //27
                                	var callcenteM = 0 //28
                                	var cecpo = 0 //7
                                	var erpM = 0 //20
                                	var clo = 0 //31
                                	var facilityM = 0 //37
                                	var storageM = 0 //22
                                	var cdo = 0 //14
                                	var coo = 0 // 5
                                	var c_academic_o = 0 //34
                                	var c_accounting_o = 0 //9
                                	var crm = 0 // 21 
                                	var cmo = 0 //26
                                	var cto = 0 //42
                                	var cpio = 0 //8
                                	var cfo = 0 //4
                                	var telephonyM = 0 //24
                                	var cco = 0 //41
                                	var c_digital_o = 0 //13
                                	var chro = 0 //33
                                	var datacenter = 0 //16
                                	var cpo = 0 //29
                                	var cqo = 0 //32
                                	var c_procurement_o = 0 //35
                                	
                            var andForCountryAndStates ={}
					    	var statePostObject = {};
							var countryPostObject = {};
							var countryPostArr = []
					    	var stateArr = ""
					    	var filterArray = []
					    	var filterObject = {}
					var sectors=""
					var co_sic_div = "";
					var orArry = []
					var andArry = []
					var andArryObject= {}
					var data_major = ""
					var data_inds = ""
					
						var objForMajor = {}
						var objForInd = {} 
        var post = function(req,res){
 					console.log(req.body)    
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
					    	 andForCountryAndStates ={}
					    	 statePostObject = {};
							 countryPostObject = {};
							 countryPostArr = []
					    	 stateArr = obj.countries[object].states
					   if(stateArr){
					    	if(stateArr.length>0){
					    		 filterArray = []
						    	for(state in stateArr){
						    		 filterObject = {}
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
	    	//	console.log(req.body.sectors)
				var mainOrObject = {}
				var mainOrArray = []
				for(objSector in req.body.sectors){
					 sectors=req.body.sectors
					 co_sic_div = sectors[objSector].co_sic_div;
				
					 orArry = []
					 andArry = []
					 andArryObject= {}
					 data_major = sectors[objSector].data_major
					 data_inds = sectors[objSector].data_inds
					for(objMajr in data_major){
						 objForMajor = {}
						if(data_major[objMajr].co_sic_majgrp.length<2)
								data_major[objMajr].co_sic_majgrp = '0'+data_major[objMajr].co_sic_majgrp
						objForMajor.co_sic_majgrp =  data_major[objMajr].co_sic_majgrp
						orArry.push(objForMajor)
					}
					for(objInd in data_inds){
						 objForInd = {}
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
				if(isEmpty(mainObject)){
			console.log("i am empty")	
				res.json({result:"0",price:"0"})
			}
			else{
			    var resultData
			     db.collection("pricebook").find({_id:"pe_pre"}).toArray(function(err, result) {
											    if (err) throw err;
											    resultData = result
			     })

                        db.collection('company').aggregate([
								 { $match: mainObject },
                                 { $lookup:
                                    {
                                      from: 'person',
                                      localField: '_id',
                                      foreignField: 'co_id',
                                      as:'person'
                                    }
                                  },{
                                     	$unwind: "$person"
                                     }
                           
                                  ,{ 
                                    $project : { 
                                        // "_id" : 1, 
                                        // "person._id" : 1,
                                        // totalPersons: { $size: "$person" },
                                         fuid: "$person.pe_fuid",
                                         email:"$person.pe_email",
                                         perExt: "$person.pe_perExt"
                                      } 
                                     }
                                     
                                  
                                    
                                 ], function(err, result) {
                                      // res.json(result)
                                     var mainArr = []
                                     var resArr = [];
                                     var emailArr = [];
                                     var extArr = [];
                                      var jsonObject = {}
                                      var counter = 0;
                  	db.collection("pricebook").find({_id:"pe_ext"}).toArray(function(err, resultPriceExt) {
						    if (err) throw err;	
                          	db.collection("pricebook").find({_id:"pe_mail"}).toArray(function(err, resultPriceEmail) {
								    if (err) throw err;	
                                      for(valueArr in req.body.priority)
                                      {
                                           resArr = []
                                      for(obj in result){
                                          var objectArr = result[obj]
                                         
                                          for(priorty in objectArr.fuid){
                                            if(req.body.priority[valueArr] == objectArr.fuid[priorty] && counter<req.body.totalComp){
                                                resArr.push({id:objectArr._id,fuid:objectArr.fuid[priorty]})
                                                mainArr.push({id:objectArr._id,fuid:objectArr.fuid[priorty]})
                                                if(objectArr.email)
                                                emailArr.push({email:objectArr.email[priorty]})
                                                if(objectArr.perExt)
                                                extArr.push({extension:objectArr.perExt[priorty]})
                                               
                                                delete  result[obj]
                                                counter++
                                           
                                                }
                                             }
                                        
                                          }
                                          	   
                                         jsonObject[valueArr] ={id:req.body.priority[valueArr],result:resArr.length, price:resultData[0].price[closest (resArr.length, Object.keys(resultData[0].price))],email:{count:emailArr.length , price:resultPriceEmail[0].price[closest (emailArr.length, Object.keys(resultPriceEmail[0].price))]},extension:{count:extArr.length , price:resultPriceExt[0].price[closest (extArr, Object.keys(resultPriceExt[0].price))]}}// resArr.length
                                          	  
                                      }
                               
                                     res.json(jsonObject)
             
                                  })//peemail
                                 
                                 })//pext
                                 
			})
       
			}
                              
 					}
 				
 				
 
 					return {  
 				
 						post:post
 					  
 					  
 					}  
 				} 

 				module.exports=bitcoin;  
 			
 			
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
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