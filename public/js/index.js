
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
function onNextClick() {
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	$("#progressbar li").eq($("fieldset").index(current_fs)).addClass("reactive");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        //'transform': 'scale('+scale+')',
        //'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 00, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: ''
	});	
}

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	console.log("next_fs",$(this).parent());
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	$("#progressbar li").eq($("fieldset").index(current_fs)).addClass("reactive");

	var step = $("#progressbar li").eq($("fieldset").index(next_fs));
	var stepID = step[0].id;

	if(stepID == "step2_text"){
		finalTotalCompInfo = 0;
		var comp_tprice = $(".comp_tprice").first().text();
		$(".final_total_comp_info").text(comp_tprice);
		console.log("compCountObj",compCountObj);
		$.blockUI({ css: { backgroundColor: '#C52C5B', color: '#fff'}, message: '<h3>Loading...</h3>' });
		$.post( baseUrl+"information",compCountObj, function( data ) {
			var keys = Object.keys(data);
			var tprice;
			// var key = keys[0];
			// var obj = data[key];
			// $("#num_"+key).text(obj.result);
			// $("#price_"+key).text(obj.price);
			// console.log("obj",obj);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var obj = data[key];
				$("#num_"+key).html((obj.result).toLocaleString("de-de"));
				$("#price_"+key).html("&#8364;"+(obj.price));
				tprice = (obj.result*obj.price).toFixed(2);
				// console.log("tprice",(12768.78).toLocaleString("en-us"));
				$("#tprice_"+key).html("&#8364;"+(Number(tprice).toLocaleString("de-de")));
			}

			$("#comp_info_cont :input").prop('checked', false);
			$('#co_bas').prop('checked', true);
			$('#co_bas').prop('disabled', true);
			$(".comp_desc").html($(".comp_pack_text").first().text()+"<br>");
			$(".comp_info_bill").html("");
			$("#final_total_comp_info").text(comp_tprice);
			$.unblockUI();
			console.log("keys",keys);
		})
		var objToPost = { "countries":[ { "_id":"DE", "states": [ { "_id": "Berlin" } ] }, { "_id":"AT", "states": [ { "_id": "Salzburg" }, { "_id": "Vorarlberg"}, { "_id": "Wien"} ] } ] };
		$.post( baseUrl+"decisionmaker",compCountObj, function( data ) {
			console.log("descion data",data);
			var keys = Object.keys(data);
			var obj;
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				obj = data[key];
				var desc_text = $("#descion_label_"+key).html();
				// $("#descion_label_"+key).html($("#descion_label_"+key).find('input'));
				desc_text = desc_text.replace(/ *\([^)]*\) */g, "");
				desc_text = desc_text+"("+obj.result+")";
				$("#descion_label_"+key).html(desc_text);
				$("#descion_"+key).prop("value",JSON.stringify(obj));
			}
		})
	}else if(stepID == "step3_text"){
		compCountObj.personsArr = [];
		compCountObj.priority = [];	
		descionPTotal = 0;
		$("#person_bill").html("");
		$("#descion_price_cont").html("");
		$(".descion_ptotal").text(0);
		$("#3rd_step :input").prop('checked', false);
		$("#person_sum_total").text("0");
		$(".priority").val("0");
		var compInfoTotal = $(".final_total_comp_info").first().text();
		$(".person_btotal").text(compInfoTotal);
		$("#pr_pricing").html("");
		$("#pr_ptotal").text("0");
		$(".priority option").prop("disabled",false);
	}else if(stepID == "step4_text"){
		console.log("compCountObj",compCountObj);
		var countries = [];
		var states = [];
		var selectionHtml = "";
		var countrySelHtml = "";
		var stateSelHtml = "";
		var postcodeSelHtml = "";
		var empHtml = "";
		var pcHtml = "";
		var sectorsHtml = "";
		var mjrGrpHtml = "";
		var indGrpHtml = "";
		var crmHtml = "";
		var erpHtml = "";
		var turnHtml = "";
		var foundateHtml = "";

		if(compCountObj.countries.length > 0){
			countrySelHtml += '<li><p><span>Country:</span>';
		}
		for (var i = 0; i < compCountObj.countries.length; i++) {
			var obj = compCountObj.countries[i];
			countrySelHtml += obj.title+",";
			for (var j = 0; j < obj.states.length; j++) {
				var sObj = obj.states[j];
				stateSelHtml += sObj._id+",";
			}
		}
		for (var i = 0; i < compCountObj.sectors.length; i++) {
			var secObj = compCountObj.sectors[i];
			sectorsHtml += secObj.title+",";
			if(secObj.data_major){
				for (var j = 0; j < secObj.data_major.length; j++) {
					var mjrObj = secObj.data_major[j];
					mjrGrpHtml += mjrObj.title+",";
				}
			}
			if(secObj.data_inds){
				for (var k = 0; k < secObj.data_inds.length; k++) {
					var indObj = secObj.data_inds[k];
					indGrpHtml += indObj.title+",";
				}
			}
		}
		for (var i = 0; i < compCountObj.co_erp.length; i++) {
			var erpObj = compCountObj.co_erp[i];
			erpHtml += erpObj.title+",";
		}
		for (var i = 0; i < compCountObj.co_crm.length; i++) {
			var crmObj = compCountObj.co_crm[i];
			crmHtml += crmObj.title+",";
		}
		if(compCountObj.countries.length > 0){
			countrySelHtml = countrySelHtml.replace(/,\s*$/, "");
			countrySelHtml += '</p></li>';
		}
		if(stateSelHtml.length>0){
			stateSelHtml = stateSelHtml.replace(/,\s*$/, "");
			stateSelHtml = "<li><p><span>State: </span>"+stateSelHtml+"</p></li>";
			console.log("stateSelHtml",stateSelHtml);
		}
		if(compCountObj.co_poscode){
			postcodeSelHtml = "<li><p><span>Postcode: </span>"+compCountObj.co_poscode+"</p></li>";
		}
		if(compCountObj.employeeFrom || compCountObj.employeeTo){
			var from,to;
			if(compCountObj.employeeFrom){
				from = compCountObj.employeeFrom;
			}else{
				from = 0;
			}
			if(compCountObj.employeeTo){
				to = compCountObj.employeeTo;
			}else{
				to = "";
			}
			empHtml = "<li><p><span>Employees: </span>"+from+"-"+to+"</p></li>";
		}
		if(compCountObj.countpcFrom || compCountObj.countpcTo){
			var from,to;
			if(compCountObj.countpcFrom){
				from = compCountObj.countpcFrom;
			}else{
				from = 0;
			}
			if(compCountObj.countpcTo){
				to = compCountObj.countpcTo;
			}else{
				to = "";
			}
			pcHtml = "<li><p><span>Pcs: </span>"+from+"-"+to+"</p></li>";
		}
		if(compCountObj.turnoverFrom || compCountObj.turnoverTo){
			var from,to;
			if(compCountObj.turnoverFrom){
				from = compCountObj.turnoverFrom;
			}else{
				from = 0;
			}
			if(compCountObj.turnoverTo){
				to = compCountObj.turnoverTo;
			}else{
				to = "";
			}
			turnHtml = "<li><p><span>Turnover: </span>"+from+"-"+to+"</p></li>";
		}
		if(compCountObj.foudateFrom || compCountObj.foudateTo){
			var from,to;
			if(compCountObj.foudateFrom){
				from = compCountObj.foudateFrom;
			}else{
				from = 0;
			}
			if(compCountObj.foudateTo){
				to = compCountObj.foudateTo;
			}else{
				to = "";
			}
			foundateHtml = "<li><p><span>Foundate: </span>"+from+"-"+to+"</p></li>";
		}
		if(sectorsHtml.length>0){
			sectorsHtml = sectorsHtml.replace(/,\s*$/, "");
			sectorsHtml = "<li><p><span>Sectors: </span>"+sectorsHtml+"</p></li>";
		}
		if(mjrGrpHtml.length>0){
			mjrGrpHtml = mjrGrpHtml.replace(/,\s*$/, "");
			mjrGrpHtml = "<li><p><span>Major Group: </span>"+mjrGrpHtml+"</p></li>";
		}
		if(indGrpHtml.length>0){
			indGrpHtml = indGrpHtml.replace(/,\s*$/, "");
			indGrpHtml = "<li><p><span>Industry Group: </span>"+indGrpHtml+"</p></li>";
		}
		if(erpHtml.length>0){
			erpHtml = erpHtml.replace(/,\s*$/, "");
			erpHtml = "<li><p><span>Erps: </span>"+erpHtml+"</p></li>";
		}
		if(crmHtml.length>0){
			crmHtml = crmHtml.replace(/,\s*$/, "");
			crmHtml = "<li><p><span>Crms: </span>"+crmHtml+"</p></li>";
		}
		selectionHtml += countrySelHtml;
		selectionHtml += stateSelHtml;
		selectionHtml += postcodeSelHtml;
		selectionHtml += empHtml;
		selectionHtml += pcHtml;
		selectionHtml += turnHtml;
		selectionHtml += foundateHtml;
		selectionHtml += sectorsHtml;
		selectionHtml += mjrGrpHtml;
		selectionHtml += indGrpHtml;
		selectionHtml += erpHtml;
		selectionHtml += crmHtml;
		$("#final_selection_cont").html(selectionHtml);

		if(localStorage.getItem("profile")){
			var profile = JSON.parse(localStorage.getItem("profile"));
			// $("#u_fname").val(profile.us_firstname);
			// $("#u_lname").val(profile.us_lastname);
			// $("#u_cname").val(profile.us_coname);
			// $("#u_street").val(profile.us_street);
			// $("#u_zip").val(profile.us_zip);
			// $("#u_city").val(profile.us_city);
			// $("#u_country").val(profile.us_country);
			// $("#u_lang").val(profile.us_language);
			// $("#u_vat").val(profile.us_vat);
			$("#data_comp").html(profile.us_coname);
			$("#data_street").html(profile.us_street);
			$("#data_zip").html(profile.us_zip);
			$("#data_country").html(profile.us_country);
			$("#data_vat").html(profile.us_vat);
		}

		var totalOfferPrice = 0;

		var cbInfoNum = $("#num_co_bas").text();
		var cbInfoPrice = $("#price_co_bas").text();
		var cbInfoTprice = $("#tprice_co_bas").text();
		var cbInfoLabel = $('label[for=co_bas]').text();

		var tPrice = cbInfoTprice.substring(1);
			tPrice = tPrice.replace(".","");
			tPrice = tPrice.replace(",",".");
			tPrice = Number(tPrice);
		totalOfferPrice += tPrice;	

		var offerHtml = '<tr>\n\
						<td class="product_name">\n\
						<div class="pro_name">\n\
						<div>\n\
						<label><span></span>'+cbInfoLabel+'</label>\n\
						</div>\n\
						</div>\n\
						</td>\n\
						<td class="hide_small">'+cbInfoNum+'</td>\n\
						<td>'+cbInfoPrice+'</td>\n\
						<td>'+cbInfoTprice+'</td>\n\
						</tr>';
		for (var i = 0; i < compCountObj.infoValues.length; i++) {
			var infoVal = compCountObj.infoValues[i];
			var cInfoNum = $("#num_"+infoVal).text();
			var cInfoPrice = $("#price_"+infoVal).text();
			var cInfoTprice = $("#tprice_"+infoVal).text();
			var cInfoLabel = $('label[for='+infoVal+']').text();
				offerHtml += '<tr>\n\
							<td class="product_name">\n\
							<div class="pro_name">\n\
							<div>\n\
							<label><span></span>'+cInfoLabel+'</label>\n\
							</div>\n\
							</div>\n\
							</td>\n\
							<td class="hide_small">'+cInfoNum+'</td>\n\
							<td>'+cInfoPrice+'</td>\n\
							<td>'+cInfoTprice+'</td>\n\
							</tr>';
			var tPrice = cInfoTprice.substring(1);
				tPrice = tPrice.replace(".","");
				tPrice = tPrice.replace(",",".");
				tPrice = Number(tPrice);
				totalOfferPrice += tPrice;
		}
		var finalPersonHtml = "";
		if ($("#descion_maker_tab").hasClass("active")) {
			// console.log("descion_maker_tab");
			/* descion tab selected */
			finalPersonHtml = "";
			for (var i = 0; i < compCountObj.personsArr.length; i++) {
				var pID = compCountObj.personsArr[i];
				var cInfoNum = $("#dp_count_descion_"+pID).text();
				var cInfoPrice = $("#dp_price_descion_"+pID).text();
				var cInfoTprice = $("#dp_tprice_descion_"+pID).text();
				var cInfoLabel = $("#dp_title_descion_"+pID).text();
					offerHtml += '<tr>\n\
								<td class="product_name">\n\
								<div class="pro_name">\n\
								<div>\n\
								<label><span></span>'+cInfoLabel+'</label>\n\
								</div>\n\
								</div>\n\
								</td>\n\
								<td class="hide_small">'+cInfoNum+'</td>\n\
								<td>&#8364;'+cInfoPrice+'</td>\n\
								<td>&#8364;'+cInfoTprice+'</td>\n\
								</tr>';

				var tPrice = cInfoTprice;
					tPrice = tPrice.replace(".","");
					tPrice = tPrice.replace(",",".");
					tPrice = Number(tPrice);
					totalOfferPrice += tPrice;	

				if($("#pe_mail_cb").prop("checked") == true){
					var val = $("#descion_"+pID).val();
						val = JSON.parse(val);
					var emailNum = val.email.count;
					var emailPrice = val.email.price;	
					var emailTprice = emailNum*emailPrice;
						emailTprice = emailTprice.toFixed(2);
						emailTprice = Number(emailTprice);

						totalOfferPrice += emailTprice;

					offerHtml += '<tr>\n\
								<td class="product_name">\n\
								<div class="pro_name">\n\
								<div>\n\
								<label><span></span>Email '+cInfoLabel+'</label>\n\
								</div>\n\
								</div>\n\
								</td>\n\
								<td class="hide_small">'+emailNum+'</td>\n\
								<td>&#8364;'+emailPrice.toLocaleString("de-de")+'</td>\n\
								<td>&#8364;'+emailTprice.toLocaleString("de-de")+'</td>\n\
								</tr>';	

				}

				if($("#pe_ext_cb").prop("checked") == true){
					var val = $("#descion_"+pID).val();
						val = JSON.parse(val);
					var extNum = val.extension.count;
					var extPrice = val.extension.price;	
					var extTprice = emailNum*emailPrice;
						extTprice = emailTprice.toFixed(2);
						extTprice = Number(emailTprice);

						totalOfferPrice += extTprice;

					offerHtml += '<tr>\n\
								<td class="product_name">\n\
								<div class="pro_name">\n\
								<div>\n\
								<label><span></span>Extension '+cInfoLabel+'</label>\n\
								</div>\n\
								</div>\n\
								</td>\n\
								<td class="hide_small">'+extNum+'</td>\n\
								<td>&#8364;'+extPrice.toLocaleString("de-de")+'</td>\n\
								<td>&#8364;'+extTprice.toLocaleString("de-de")+'</td>\n\
								</tr>';	

				}
				finalPersonHtml += cInfoLabel+", ";				
			}
		}else{
			// console.log("priority_tab");
			/* priority tab selected */
			finalPersonHtml = "";
			for (var i = 0; i < compCountObj.priority.length; i++) {
				var pID = compCountObj.priority[i];
				if(pID != 0){
					var cInfoNum = $("#pr_count_"+pID).text();
					var cInfoPrice = $("#pr_price_"+pID).text();
					var cInfoTprice = $("#pr_tprice_"+pID).text();
					var cInfoLabel = $("#pr_title_"+pID).text();

						var tPrice = cInfoTprice;
						tPrice = tPrice.replace(".","");
						tPrice = tPrice.replace(",",".");
						tPrice = Number(tPrice);
						totalOfferPrice += tPrice;

						offerHtml += '<tr>\n\
									<td class="product_name">\n\
									<div class="pro_name">\n\
									<div>\n\
									<label><span></span>'+cInfoLabel+'</label>\n\
									</div>\n\
									</div>\n\
									</td>\n\
									<td class="hide_small">'+cInfoNum+'</td>\n\
									<td>&#8364;'+cInfoPrice+'</td>\n\
									<td>&#8364;'+cInfoTprice+'</td>\n\
									</tr>';
					finalPersonHtml += cInfoLabel+", ";				
				}
			}
		}

		offerHtml += '<tr><td colspan="4"><div class="item_total">\n\
					<span><span style="display: inline;" class="total_text">Total</span>:  </span>&#8364; <span class="" style="display: inline;">'+totalOfferPrice.toLocaleString("de-de")+'</span>\n\
					</div><td></tr>';

		$("#offer_cont").html(offerHtml);
		if(finalPersonHtml.length>0){
			finalPersonHtml = finalPersonHtml.replace(/,\s*$/, "");
		}
		$("#final_persons_cont").html(finalPersonHtml);

		// console.log("totalOfferPrice",totalOfferPrice.toLocaleString("de-de"));

		// for (var j = 0; j < infoValuesArr.length; j++) {
		// 	var obj = infoValuesArr[j];
		// }
	}

	// console.log("index",step[0].id);
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        //'transform': 'scale('+scale+')',
        //'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 00, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: ''
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	$("#progressbar li").eq($("fieldset").index(previous_fs)).removeClass("reactive");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 00, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: ''
	});
});

$(".submit").click(function(){
	return false;
})