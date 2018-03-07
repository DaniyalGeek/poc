var db = require('../Server');
var mongo = require('mongodb');
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
                                	
                                	
                                	var email_co_cio = 0 //11
                                	var email_co_cco = 0 //6
                                	var email_e_com = 0 //40
                                	var email_co_ciso = 0 //19
                                	var email_co_ceo = 0 // 1
                                	var email_cso = 0 //27
                                	var email_callcenteM = 0 //28
                                	var email_cecpo = 0 //7
                                	var email_erpM = 0 //20
                                	var email_clo = 0 //31
                                	var email_facilityM = 0 //37
                                	var email_storageM = 0 //22
                                	var email_cdo = 0 //14
                                	var email_coo = 0 // 5
                                	var email_c_academic_o = 0 //34
                                	var email_c_accounting_o = 0 //9
                                	var email_crm = 0 // 21 
                                	var email_cmo = 0 //26
                                	var email_cto = 0 //42
                                	var email_cpio = 0 //8
                                	var email_cfo = 0 //4
                                	var email_telephonyM = 0 //24
                                	var email_cco = 0 //41
                                	var email_c_digital_o = 0 //13
                                	var email_chro = 0 //33
                                	var email_datacenter = 0 //16
                                	var email_cpo = 0 //29
                                	var email_cqo = 0 //32
                                	var email_c_procurement_o = 0 //35
                                	
                                	var perExt_co_cio = 0 //11
                                	var perExt_co_cco = 0 //6
                                	var perExt_e_com = 0 //40
                                	var perExt_co_ciso = 0 //19
                                	var perExt_co_ceo = 0 // 1
                                	var perExt_cso = 0 //27
                                	var perExt_callcenteM = 0 //28
                                	var perExt_cecpo = 0 //7
                                	var perExt_erpM = 0 //20
                                	var perExt_clo = 0 //31
                                	var perExt_facilityM = 0 //37
                                	var perExt_storageM = 0 //22
                                	var perExt_cdo = 0 //14
                                	var perExt_coo = 0 // 5
                                	var perExt_c_academic_o = 0 //34
                                	var perExt_c_accounting_o = 0 //9
                                	var perExt_crm = 0 // 21 
                                	var perExt_cmo = 0 //26
                                	var perExt_cto = 0 //42
                                	var perExt_cpio = 0 //8
                                	var perExt_cfo = 0 //4
                                	var perExt_telephonyM = 0 //24
                                	var perExt_cco = 0 //41
                                	var perExt_c_digital_o = 0 //13
                                	var perExt_chro = 0 //33
                                	var perExt_datacenter = 0 //16
                                	var perExt_cpo = 0 //29
                                	var perExt_cqo = 0 //32
                                	var perExt_c_procurement_o = 0 //35
                                	
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
                                 //	console.log(result)
                                 if (err) throw err;
                                     co_cio = 0 //11
                                     co_cco = 0 //6
                                     e_com = 0 //40
                                     co_ciso = 0 //19
                                     co_ceo = 0 // 1
                                     cso = 0 //27
                                     callcenteM = 0 //28
                                     cecpo = 0 //7
                                     erpM = 0 //20
                                     clo = 0 //31
                                     facilityM = 0 //37
                                     storageM = 0 //22
                                     cdo = 0 //14
                                     coo = 0 // 5
                                     c_academic_o = 0 //34
                                     c_accounting_o = 0 //9
                                     crm = 0 // 21 
                                     cmo = 0 //26
                                     cto = 0 //42
                                     cpio = 0 //8
                                     cfo = 0 //4
                                     telephonyM = 0 //24
                                     cco = 0 //41
                                     c_digital_o = 0 //13
                                     chro = 0 //33
                                     datacenter = 0 //16
                                     cpo = 0 //29
                                     cqo = 0 //32
                                     c_procurement_o = 0 //35
                                	
                                	
                                	
									 email_co_cio = 0 //11
                                	 email_co_cco = 0 //6
                                	 email_e_com = 0 //40
                                	 email_co_ciso = 0 //19
                                	 email_co_ceo = 0 // 1
                                	 email_cso = 0 //27
                                	 email_callcenteM = 0 //28
                                	 email_cecpo = 0 //7
                                	 email_erpM = 0 //20
                                	 email_clo = 0 //31
                                	 email_facilityM = 0 //37
                                	 email_storageM = 0 //22
                                	 email_cdo = 0 //14
                                	 email_coo = 0 // 5
                                	 email_c_academic_o = 0 //34
                                	 email_c_accounting_o = 0 //9
                                	 email_crm = 0 // 21 
                                	 email_cmo = 0 //26
                                	 email_cto = 0 //42
                                	 email_cpio = 0 //8
                                	 email_cfo = 0 //4
                                	 email_telephonyM = 0 //24
                                	 email_cco = 0 //41
                                	 email_c_digital_o = 0 //13
                                	 email_chro = 0 //33
                                	 email_datacenter = 0 //16
                                	 email_cpo = 0 //29
                                	 email_cqo = 0 //32
                                	 email_c_procurement_o = 0 //35
                                	 
                                	 
                                	 perExt_co_cio = 0 //11
                                	 perExt_co_cco = 0 //6
                                	 perExt_e_com = 0 //40
                                	 perExt_co_ciso = 0 //19
                                	 perExt_co_ceo = 0 // 1
                                	 perExt_cso = 0 //27
                                	 perExt_callcenteM = 0 //28
                                	 perExt_cecpo = 0 //7
                                	 perExt_erpM = 0 //20
                                	 perExt_clo = 0 //31
                                	 perExt_facilityM = 0 //37
                                	 perExt_storageM = 0 //22
                                	 perExt_cdo = 0 //14
                                	 perExt_coo = 0 // 5
                                	 perExt_c_academic_o = 0 //34
                                	 perExt_c_accounting_o = 0 //9
                                	 perExt_crm = 0 // 21 
                                	 perExt_cmo = 0 //26
                                	 perExt_cto = 0 //42
                                	 perExt_cpio = 0 //8
                                	 perExt_cfo = 0 //4
                                	 perExt_telephonyM = 0 //24
                                	 perExt_cco = 0 //41
                                	 perExt_c_digital_o = 0 //13
                                	 perExt_chro = 0 //33
                                	 perExt_datacenter = 0 //16
                                	 perExt_cpo = 0 //29
                                	 perExt_cqo = 0 //32
                                	 perExt_c_procurement_o = 0 //35
                                	 
                                	var innet_object = ""
                                	var inner_object__email = ""
                                	var inner_object__perExt = ""
									for(obj in result){
									//	console.log(result[obj])
										inner_object__email = ""
										innet_object = result[obj].fuid
										if(result[obj].email){
										inner_object__email = result[obj].email
										}
										if(result[obj].perExt){
										inner_object__perExt = result[obj].perExt
										}
										// console.log(innet_object)
										
										 			if(innet_object[0] == 1)
										 			{	
										 				co_ceo++
										 			if(inner_object__email != "" )
										 			{
										 				email_co_ceo++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_co_ceo++
										 			}
										 			}
										 		 else if(innet_object[0] == 11)
										 			{	
										 				co_cio++
										 			if(inner_object__email != "")
										 			{
														email_co_cio++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_co_cio++
										 			}
										 			}
										 		 else if(innet_object[0] == 6)
										 			{	
										 				co_cco++
										 			if(inner_object__email != "")
										 			{
														email_co_cco++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_co_cco++
										 			}
										 			}
										 		 else if(innet_object[0] == 40)
										 			{	
										 				e_com++
										 			if(inner_object__email != "")
										 			{
														email_e_com++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_e_com++
										 			}
										 			}
										 		 else if(innet_object[0] == 19)
										 			{	
										 				co_ciso++
										 			if(inner_object__email != "")
										 			{
														email_co_ciso++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_co_ciso++
										 			}
										 			}
										 		 else if(innet_object[0] == 27)
										 			{	
										 				cso++
										 			if(inner_object__email != "")
										 			{
														email_cso++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cso++
										 			}
										 			}
										 		 else if(innet_object[0] == 28)
										 			{	
										 				callcenteM++
										 			if(inner_object__email != "")
										 			{
														email_callcenteM++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_callcenteM++
										 			}
										 			}
										 		 else if(innet_object[0] == 7)
										 			{	
										 				cecpo++
										 			if(inner_object__email != "")
										 			{
														email_cecpo++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cecpo++
										 			}
										 			}
										 		 else if(innet_object[0] == 20)
										 			{	
										 				erpM++
										 			if(inner_object__email != "")
										 			{
														email_erpM++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_erpM++
										 			}
										 			}
										 		 else if(innet_object[0] == 31)
										 			{	
										 				clo++
										 			if(inner_object__email != "")
										 			{
														email_clo++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_clo++
										 			}
										 			}
										 		 else if(innet_object[0] == 37)
										 			{	
										 				facilityM++
										 			if(inner_object__email != "")
										 			{
														email_facilityM++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_facilityM++
										 			}
										 			}
										 		 else if(innet_object[0] == 22)
										 			{	
										 				storageM++
										 			if(inner_object__email != "")
										 			{
														email_storageM++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_storageM++
										 			}
										 			}
										 		 else if(innet_object[0] == 14)
										 			{	
										 				cdo++
										 			if(inner_object__email != "")
										 			{
														email_cdo++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cdo++
										 			}
										 			}
										 		 else if(innet_object[0] == 5)
										 			{	
										 				coo++
										 			if(inner_object__email != "")
										 			{
														email_coo++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_coo++
										 			}
										 			}
										 		 else if(innet_object[0] == 34)
										 			{	
										 				c_academic_o++
										 			if(inner_object__email != "")
										 			{
														email_c_academic_o++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_c_academic_o++
										 			}
										 			}
										 		 else if(innet_object[0] == 9)
										 			{	
										 				c_accounting_o++
										 			if(inner_object__email != "")
										 			{
														email_c_accounting_o++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_c_accounting_o++
										 			}}

										 		 else if(innet_object[0] == 21)
										 			{	
										 				crm++
										 			if(inner_object__email != "")
										 			{
														email_crm++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_crm++
										 			}
										 			}
										 		 else if(innet_object[0] == 42)
										 			{	
										 				cto++
										 			if(inner_object__email != "")
										 			{
														email_cto++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cto++
										 			}
										 			}
										 		 else if(innet_object[0] == 8)
										 			{	
										 				cpio++
										 			if(inner_object__email != "")
										 			{
														email_cpio++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cpio++
										 			}
										 			}
										 		 else if(innet_object[0] == 4)
										 			{	
										 				cfo++
										 			if(inner_object__email != "")
										 			{
														email_cfo++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cfo++
										 			}
										 			}
										 		 else if(innet_object[0] == 24)
										 			{	
										 				telephonyM++
										 			if(inner_object__email != "")
										 			{
														email_telephonyM++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_telephonyM++
										 			}
										 			}
										 		 else if(innet_object[0] == 41)
										 			{	
										 				cco++
										 			if(inner_object__email != "")
										 			{
														email_cco++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cco++
										 			}
										 			}
										 		 else if(innet_object[0] == 13)
										 			{	
										 				c_digital_o++
										 			if(inner_object__email != "")
										 			{
														email_c_digital_o++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_c_digital_o++
										 			}
										 			}
										 		 else if(innet_object[0] == 33)
										 			{	
										 				chro++
										 			if(inner_object__email != "")
										 			{
														email_chro++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_chro++
										 			}
										 			}
										 		 else if(innet_object[0] == 16)
										 			{	
										 				datacenter++
										 			if(inner_object__email != "")
										 			{
														email_datacenter++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_datacenter++
										 			}
										 			}
										 		 else if(innet_object[0] == 29)
										 			{	
										 				cpo++
										 			if(inner_object__email != "")
										 			{
														email_cpo++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cpo++
										 			}
										 			}
										 		 else if(innet_object[0] == 32)
										 			{	
										 				cqo++
										 			if(inner_object__email != "")
										 			{
														email_cqo++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_cqo++
										 			}
										 			}
										 		 else if(innet_object[0] == 35)
										 			{	
										 				c_procurement_o++
										 			if(inner_object__email != "")
										 			{
														email_c_procurement_o++
										 			}
										 			if(inner_object__email != ""){
										 				perExt_c_procurement_o++
										 			}
										 			}
									}
								
									    db.collection("pricebook").find({_id:"pe_pre"}).toArray(function(err, resultData) {
											    if (err) throw err;
											    
										db.collection("pricebook").find({_id:"pe_mail"}).toArray(function(err, resultPriceEmail) {
											    if (err) throw err;	   
											db.collection("pricebook").find({_id:"pe_ext"}).toArray(function(err, resultPriceExt) {
											    if (err) throw err;	
											    
											    							
countObject["11"]      ={extension:{count:perExt_co_cio , price:resultPriceExt[0].price[closest (perExt_co_cio, Object.keys(resultPriceExt[0].price))]},email:{count:email_co_cio , price:resultPriceEmail[0].price[closest (email_co_cio, Object.keys(resultPriceEmail[0].price))]},result:co_cio, price:resultData[0].price[closest (co_cio, Object.keys(resultData[0].price))]}      
countObject["6"]      =  {extension:{count:perExt_co_cco , price:resultPriceExt[0].price[closest (perExt_co_cco, Object.keys(resultPriceExt[0].price))]},email:{count:email_co_cco , price:resultPriceEmail[0].price[closest (email_co_cco, Object.keys(resultPriceEmail[0].price))]},result:co_cco, price:resultData[0].price[closest (co_cco, Object.keys(resultData[0].price))]}                                             
countObject["40"]      =   {extension:{count:perExt_e_com , price:resultPriceExt[0].price[closest (perExt_e_com, Object.keys(resultPriceExt[0].price))]},email:{count:email_e_com , price:resultPriceEmail[0].price[closest (email_e_com, Object.keys(resultPriceEmail[0].price))]},result:e_com, price:resultData[0].price[closest (e_com, Object.keys(resultData[0].price))]}       
countObject["19"]      =          {extension:{count:perExt_co_ciso , price:resultPriceExt[0].price[closest (perExt_co_ciso, Object.keys(resultPriceExt[0].price))]},email:{count:email_co_ciso , price:resultPriceEmail[0].price[closest (email_co_ciso, Object.keys(resultPriceEmail[0].price))]},result:co_ciso, price:resultData[0].price[closest (co_ciso, Object.keys(resultData[0].price))]}
countObject["1"]      =         {extension:{count:perExt_co_ceo , price:resultPriceExt[0].price[closest (perExt_co_ceo, Object.keys(resultPriceExt[0].price))]},email:{count:email_co_ceo , price:resultPriceEmail[0].price[closest (email_co_ceo, Object.keys(resultPriceEmail[0].price))]},result:co_ceo, price:resultData[0].price[closest (co_ceo, Object.keys(resultData[0].price))]}
countObject["27"]      =          {extension:{count:perExt_cso , price:resultPriceExt[0].price[closest (perExt_cso, Object.keys(resultPriceExt[0].price))]},email:{count:email_cso , price:resultPriceEmail[0].price[closest (email_cso, Object.keys(resultPriceEmail[0].price))]},result:cso, price:resultData[0].price[closest (cso, Object.keys(resultData[0].price))]}
countObject["28"]      =          {extension:{count:perExt_callcenteM , price:resultPriceExt[0].price[closest (perExt_callcenteM, Object.keys(resultPriceExt[0].price))]},email:{count:email_callcenteM , price:resultPriceEmail[0].price[closest (email_callcenteM, Object.keys(resultPriceEmail[0].price))]},result:callcenteM, price:resultData[0].price[closest (callcenteM, Object.keys(resultData[0].price))]}
countObject["7"]      =             {extension:{count:perExt_cecpo , price:resultPriceExt[0].price[closest (perExt_cecpo, Object.keys(resultPriceExt[0].price))]},email:{count:email_cecpo , price:resultPriceEmail[0].price[closest (email_cecpo, Object.keys(resultPriceEmail[0].price))]},result:cecpo, price:resultData[0].price[closest (cecpo, Object.keys(resultData[0].price))]}
countObject["20"]      =          {extension:{count:perExt_erpM , price:resultPriceExt[0].price[closest (perExt_erpM, Object.keys(resultPriceExt[0].price))]},email:{count:email_erpM , price:resultPriceEmail[0].price[closest (email_erpM, Object.keys(resultPriceEmail[0].price))]},result:erpM, price:resultData[0].price[closest (erpM, Object.keys(resultData[0].price))]}
countObject["31"]      =          {extension:{count:perExt_clo , price:resultPriceExt[0].price[closest (perExt_clo, Object.keys(resultPriceExt[0].price))]},email:{count:email_clo , price:resultPriceEmail[0].price[closest (email_clo, Object.keys(resultPriceEmail[0].price))]},result:clo, price:resultData[0].price[closest (clo, Object.keys(resultData[0].price))]}
countObject["37"]      =          {extension:{count:perExt_facilityM , price:resultPriceExt[0].price[closest (perExt_facilityM, Object.keys(resultPriceExt[0].price))]},email:{count:email_facilityM , price:resultPriceEmail[0].price[closest (email_facilityM, Object.keys(resultPriceEmail[0].price))]},result:facilityM, price:resultData[0].price[closest (facilityM, Object.keys(resultData[0].price))]}
countObject["22"]      =          {extension:{count:perExt_storageM , price:resultPriceExt[0].price[closest (perExt_storageM, Object.keys(resultPriceExt[0].price))]},email:{count:email_storageM, price:resultPriceEmail[0].price[closest (email_storageM, Object.keys(resultPriceEmail[0].price))]},result:storageM, price:resultData[0].price[closest (storageM, Object.keys(resultData[0].price))]}
countObject["14"]      =          {extension:{count:perExt_cdo , price:resultPriceExt[0].price[closest (perExt_cdo, Object.keys(resultPriceExt[0].price))]},email:{count:email_cdo , price:resultPriceEmail[0].price[closest (email_cdo, Object.keys(resultPriceEmail[0].price))]},result:cdo, price:resultData[0].price[closest (cdo, Object.keys(resultData[0].price))]}
countObject["5"]      =          {extension:{count:perExt_coo , price:resultPriceExt[0].price[closest (perExt_coo, Object.keys(resultPriceExt[0].price))]},email:{count:email_coo , price:resultPriceEmail[0].price[closest (email_coo, Object.keys(resultPriceEmail[0].price))]},result:coo, price:resultData[0].price[closest (coo, Object.keys(resultData[0].price))]}
countObject["34"]      =          {extension:{count:perExt_c_academic_o , price:resultPriceExt[0].price[closest (perExt_c_academic_o, Object.keys(resultPriceExt[0].price))]},email:{count:email_c_academic_o , price:resultPriceEmail[0].price[closest (email_c_academic_o, Object.keys(resultPriceEmail[0].price))]},result:c_academic_o, price:resultData[0].price[closest (c_academic_o, Object.keys(resultData[0].price))]}
countObject["9"]     =    {extension:{count:perExt_c_accounting_o , price:resultPriceExt[0].price[closest (perExt_c_accounting_o, Object.keys(resultPriceExt[0].price))]},email:{count:email_c_accounting_o , price:resultPriceEmail[0].price[closest (email_c_accounting_o, Object.keys(resultPriceEmail[0].price))]},result:c_accounting_o, price:resultData[0].price[closest (c_accounting_o, Object.keys(resultData[0].price))]}
countObject["21"]      =          {extension:{count:perExt_crm , price:resultPriceExt[0].price[closest (perExt_crm, Object.keys(resultPriceExt[0].price))]},email:{count:email_crm , price:resultPriceEmail[0].price[closest (email_crm, Object.keys(resultPriceEmail[0].price))]},result:crm, price:resultData[0].price[closest (crm, Object.keys(resultData[0].price))]}
countObject["26"]      =          {extension:{count:perExt_cmo , price:resultPriceExt[0].price[closest (perExt_cmo, Object.keys(resultPriceExt[0].price))]},email:{count:email_cmo , price:resultPriceEmail[0].price[closest (email_cmo, Object.keys(resultPriceEmail[0].price))]},result:cmo, price:resultData[0].price[closest (cmo, Object.keys(resultData[0].price))]}
countObject["42"]      =          {extension:{count:perExt_cto , price:resultPriceExt[0].price[closest (perExt_cto, Object.keys(resultPriceExt[0].price))]},email:{count:email_cto , price:resultPriceEmail[0].price[closest (email_cto, Object.keys(resultPriceEmail[0].price))]},result:cto, price:resultData[0].price[closest (cto, Object.keys(resultData[0].price))]}
countObject["8"]      =        {extension:{count:perExt_cpio , price:resultPriceExt[0].price[closest (perExt_cpio, Object.keys(resultPriceExt[0].price))]},email:{count:email_cpio , price:resultPriceEmail[0].price[closest (email_cpio, Object.keys(resultPriceEmail[0].price))]},result:cpio, price:resultData[0].price[closest (cpio, Object.keys(resultData[0].price))]}
countObject["4"]      =        {extension:{count:perExt_cfo , price:resultPriceExt[0].price[closest (perExt_cfo, Object.keys(resultPriceExt[0].price))]},email:{count:email_cfo , price:resultPriceEmail[0].price[closest (email_cfo, Object.keys(resultPriceEmail[0].price))]},result:cfo, price:resultData[0].price[closest (cfo, Object.keys(resultData[0].price))]}
countObject["24"]      =          {extension:{count:perExt_telephonyM , price:resultPriceExt[0].price[closest (perExt_telephonyM, Object.keys(resultPriceExt[0].price))]},email:{count:email_telephonyM , price:resultPriceEmail[0].price[closest (email_telephonyM, Object.keys(resultPriceEmail[0].price))]},result:telephonyM, price:resultData[0].price[closest (telephonyM, Object.keys(resultData[0].price))]}
countObject["41"]      =          {extension:{count:perExt_cco , price:resultPriceExt[0].price[closest (perExt_cco, Object.keys(resultPriceExt[0].price))]},email:{count:email_cco , price:resultPriceEmail[0].price[closest (email_cco, Object.keys(resultPriceEmail[0].price))]},result:cco, price:resultData[0].price[closest (cco, Object.keys(resultData[0].price))]}
countObject["13"]      =          {extension:{count:perExt_c_digital_o , price:resultPriceExt[0].price[closest (perExt_c_digital_o, Object.keys(resultPriceExt[0].price))]},email:{count:email_c_digital_o , price:resultPriceEmail[0].price[closest (email_c_digital_o, Object.keys(resultPriceEmail[0].price))]},result:c_digital_o, price:resultData[0].price[closest (c_digital_o, Object.keys(resultData[0].price))]}
countObject["33"]      =          {extension:{count:perExt_chro , price:resultPriceExt[0].price[closest (perExt_chro, Object.keys(resultPriceExt[0].price))]},email:{count:email_chro , price:resultPriceEmail[0].price[closest (email_chro, Object.keys(resultPriceEmail[0].price))]},result:chro, price:resultData[0].price[closest (chro, Object.keys(resultData[0].price))]}
countObject["16"]      =          {extension:{count:perExt_datacenter , price:resultPriceExt[0].price[closest (perExt_datacenter, Object.keys(resultPriceExt[0].price))]},email:{count:email_datacenter , price:resultPriceEmail[0].price[closest (email_datacenter, Object.keys(resultPriceEmail[0].price))]},result:datacenter, price:resultData[0].price[closest (datacenter, Object.keys(resultData[0].price))]}
countObject["29"]      =          {extension:{count:perExt_cpo , price:resultPriceExt[0].price[closest (perExt_cpo, Object.keys(resultPriceExt[0].price))]},email:{count:email_cpo , price:resultPriceEmail[0].price[closest (email_cpo, Object.keys(resultPriceEmail[0].price))]},result:cpo, price:resultData[0].price[closest (cpo, Object.keys(resultData[0].price))]}
countObject["32"]      =          {extension:{count:perExt_cqo , price:resultPriceExt[0].price[closest (perExt_cqo, Object.keys(resultPriceExt[0].price))]},email:{count:email_cqo , price:resultPriceEmail[0].price[closest (email_cqo, Object.keys(resultPriceEmail[0].price))]},result:cqo, price:resultData[0].price[closest (cqo, Object.keys(resultData[0].price))]}
countObject["35"]     =            {extension:{count:perExt_c_procurement_o , price:resultPriceExt[0].price[closest (perExt_c_procurement_o, Object.keys(resultPriceExt[0].price))]},email:{count:email_c_procurement_o , price:resultPriceEmail[0].price[closest (email_c_procurement_o, Object.keys(resultPriceEmail[0].price))]},result:c_procurement_o, price:resultData[0].price[closest (c_procurement_o, Object.keys(resultData[0].price))]}
res.json(countObject)
									    })
								})
                          
                               
                              })
                    })
			}
                              
 					}
 					var get=function (req,res) {
                        
                         
 					
                        db.collection("department").find({}).sort({"sort" : 1.0}).toArray(function(err, result) {
                                    if (err) throw err;
                                    var object = 0;
                                    var arr = [];
                                    getter(object)
                                    function getter(object){
                                      	 db.collection("function").find({"fu_departmentid": result[object]._id}).sort({"fu_sort" : 1.0}).toArray(function(err, data) {
                                  
                                      	        arr.push({name: result[object].title,data})
                                      	        object++
                                      	     if(object < result.length){
                                      	        getter(object)
                                      	     }else{
                                      	          res.json(arr )
                                      	     }
                                      	 })
                                      	 
                                    }
                                  
                                  
                                  });
            	      
 					} 
 					var getOne=function (req,res) {
                        
                                
                        db.collection("department").find({country_id:req.params.id}).toArray(function(err, result) {
                                    if (err) throw err;
                                  //  console.log(result);
                                  //  db.close();
                                  res.json(result )
                                  });
            	      
 					} 
 
 					return {  
 						get: 	get ,
 						getOne:getOne,
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