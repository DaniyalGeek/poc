var baseUrl = "https://poc-withease.c9users.io/";
var compCountObj = {};
compCountObj.countries = [];
compCountObj.sectors = [];
compCountObj.co_crm = [];
compCountObj.co_erp = [];
compCountObj.infoValues = [];
compCountObj.personsArr = [];
compCountObj.priority = [];
var stateHtml = "";
// compCountObj.employeeFrom = null;
// compCountObj.employeeTo = null;
// compCountObj.co_state = [];

// window.fbAsyncInit = function() {
// FB.init({
//   appId      : '{279931795864488}',
//   cookie     : true,
//   xfbml      : true,
//   version    : 'v2.9'
// });
  
// FB.AppEvents.logPageView();   
  
// };

// (function(d, s, id){
//  var js, fjs = d.getElementsByTagName(s)[0];
//  if (d.getElementById(id)) {return;}
//  js = d.createElement(s); js.id = id;
//  js.src = "https://connect.facebook.net/en_US/sdk.js";
//  fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var user;
var lang = 'de';

if(localStorage.getItem("user")){
	$("#logout_btn").show();
	$("#profile_btn").show();

	$("#login_btn").hide();
	$("#join_btn").hide();
	$("#log_box").hide();
	$("#log_box2").hide();
	$("#log_box3").hide();
	$("#log_box4").hide();

	$("#sel_box").show();
	$("#sel_box2").show();
	$("#sel_box3").show();
	$("#box4").show();

	user = JSON.parse(localStorage.getItem("user"));
	console.log("user",user);
	getSelections();
}else{
	$("#logout_btn").hide();
	$("#profile_btn").hide();

	$("#login_btn").show();
	$("#join_btn").show();
	$("#log_box").show();
	$("#log_box2").show();
	$("#log_box3").show();
	$("#log_box4").show();

	$("#sel_box").hide();
	$("#sel_box2").hide();
	$("#sel_box3").hide();
	$("#box4").hide();

}

if(localStorage.getItem("profile")){
	var profile = JSON.parse(localStorage.getItem("profile"));
	if(profile.us_language){
		lang = profile.us_language;
		if(lang == "en"){
			$("#language" ).text( "English" );
		}else{
			$("#language" ).text( "German" );
		}
	}
}

// getAllSectors();
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
// function addCommas(nStr) {
//     nStr += '';
//     x = nStr.split('.');
//     x1 = x[0];
//     x2 = x.length > 1 ? '.' + x[1] : '';
//     var rgx = /(\d+)(\d{3})/;
//     while (rgx.test(x1)) {
//         x1 = x1.replace(rgx, '$1' + ',' + '$2');
//     }
//     return x1 + x2;
// }
function changeLang(lang) {
	console.log(lang);
	lang = lang;
	$("#language" ).text( lang );
	$(".open_language").slideToggle("slow");
	window.location.href = window.location.href.replace( /[\?#].*|$/, "?lang="+lang );

}
var params = getQueryParams(document.location.search);
if(params.lang){
	lang = params.lang;
	if(lang == "en"){
		$("#language" ).text( "English" );
	}else{
		$("#language" ).text( "German" );
	}
}
if(params.forgot){
	$(".modal_new_password").modal('toggle');

}
function loadAllText() {
	console.log("loadAllText()");
	$.get( baseUrl+"info", function( data ) {
		$("#country_text" ).text( data[4].step.country.text[lang] );
		$("#country_tooltip_text" ).text( data[4].step.country.info[lang] );

		$("#state_text" ).text( data[4].step.state.text[lang] );
		$("#state_tooltip_text" ).text( data[4].step.state.info[lang] );

		$("#postcode_text" ).text( data[4].step.postcode.text[lang] );
		$("#postcode_tooltip_text" ).text( data[4].step.postcode.info[lang] );

		$("#postcode_subtext" ).text( data[4].step.postcode.subtext[lang] );
		$("#circle_text" ).text( data[4].step.circle.text[lang] );

		$("#compsize_text" ).text( data[4].step.size.text[lang] );
		$("#compsize_tooltip_text" ).text( data[4].step.size.info[lang] );

		$("#emp_count_text" ).text( data[4].step.size.selectors.empl[lang] );
		$("#pc_count_text" ).text( data[4].step.size.selectors.pcuser[lang] );
		$("#turnover_count_text" ).text( data[4].step.size.selectors.turnover[lang] );
		$("#foundedin_text" ).text( data[4].step.size.selectors.founded[lang] );

		$("#sic_text" ).text( data[4].step.siccode.text[lang] );
		$("#sic_tooltip_text" ).text( data[4].step.siccode.info[lang] );

		$("#erp_text" ).text( data[4].step.erp.text[lang] );
		$("#erp_tooltip_text" ).text( data[4].step.erp.info[lang] );

		$("#crm_text" ).text( data[4].step.crm.text[lang] );
		$("#crm_tooltip_text" ).text( data[4].step.crm.info[lang] );

		$("#step1_text").text(data[8].step["1"][lang]);
		$("#step2_text").text(data[8].step["2"][lang]);
		$("#step3_text").text(data[8].step["3"][lang]);
		$("#step4_text").text(data[8].step["4"][lang]);
		$("#step5_text").text(data[8].step["5"][lang]);

		$(".b_sum_text").text(data[7].step.sum.title[lang]);
		$(".b_comps_text").text(data[7].step.sum.content.com[lang]);
		$(".comp_info_text").text(data[7].step.sum.content.cif[lang]);
		$(".person_text").text(data[7].step.sum.content.per[lang]);
		$(".b_pack_text").text(data[7].step.sum.content.pac[lang]);
		$(".b_tot_text").text(data[7].step.sum.content.tot[lang]);

		$(".b_sel_text").text(data[7].step.sel.title[lang]);
		$(".b_name_text").text(data[7].step.sel.content.nam[lang]);
		$(".b_num_text").text(data[7].step.sel.content.num[lang]);
		$(".b_save_text").text(data[7].step.sel.content.sav[lang]);
		$(".b_save_sel_text").text(data[7].step.sel.content.log[lang]);

		$("#not_member_text").text(data[0].fields[21][lang]);
		$("#join_now_text").text(data[0].fields[22][lang]);
		$(".login_text").text(data[0].fields[27][lang]);
		$("#u_fname").attr("placeholder",data[0].fields[1][lang]);
		$("#u_lname").attr("placeholder",data[0].fields[2][lang]);
		$("#u_cname").attr("placeholder",data[0].fields[3][lang]);
		$("#u_street").attr("placeholder",data[0].fields[4][lang]);
		$("#u_zip").attr("placeholder",data[0].fields[5][lang]);
		$("#u_city").attr("placeholder",data[0].fields[6][lang]);
		$("#u_country").attr("placeholder",data[0].fields[7][lang]);
		$("#u_vat").attr("placeholder",data[0].fields[8][lang]);
		$(".save_text").text(data[0].fields[11][lang]);

		$(".already_member_text").text(data[0].fields[26][lang]);
		$(".your_profile_text").text(data[0].title[lang]);


		$("#l_email").attr("placeholder",data[0].fields[12][lang]);
		$("#l_pass").attr("placeholder",data[0].fields[13][lang]);
		$(".login_form_submit").attr("value",data[0].fields[15][lang]);
		$(".pass").text(data[0].fields[17][lang]);
		$(".not_member_text").text(data[0].fields[21][lang]);
		$(".join_text").text(data[0].fields[22][lang]);
		$(".login_bd_text").text(data[0].fields[14][lang]);

		$("#join_bd_text").text(data[0].fields[23][lang]);

		$(".product_text").text(data[1].step[5].step[1][lang]);
		$(".number_text").text(data[1].step[5].step[2][lang]);
		$(".piece_text").text(data[1].step[5].step[3][lang]);
		$(".total_text").text(data[1].step[5].step[4][lang]);
		
		$(".select_dm_text").text(data[6].step[1][lang]);
		$(".select_pr_text").text(data[6].step[2][lang]);
		$(".add_info_text").text(data[6].step[3][lang]);
		$(".pricing_text").text(data[6].step[4][lang]);
		// $(".priority_text").text(data[6].step[6][lang]);
		$(".your_sel_text").text(data[1].step[1][lang]);
		$(".your_pack_text").text(data[1].step[2][lang]);
		$(".companies_text").text(data[1].step[3][lang]);

		$(".your_offer_text").text(data[1].step[5].title[lang]);

		$(".your_data_text").text(data[7].step.buy.title[lang]);
		$(".company_name_text").text(data[0].fields[3][lang]);
		$(".street_text").text(data[0].fields[4][lang]);
		$(".zip_text").text(data[0].fields[5][lang]);
		$(".country_text").text(data[0].fields[7][lang]);
		$(".vat_text").text(data[0].fields[8][lang]);

		$(".pay_by_inv_text").text(data[7].step.buy.bu2[lang]);

		$(".ordered_on_text").text(data[2].step[2][lang]);
		$(".count_of_text").text(data[2].step[3][lang]);
		$(".invoice_text").text(data[2].step[4][lang]);
		$(".payment_text").text(data[2].step[5][lang]);
		$(".data_text").text(data[2].step[6][lang]);
		$(".download_on_text").text(data[2].step[7][lang]);

	})
}

var pPkgHtml = "";
function getPersonsText() {
	$.get( baseUrl+"article/person", function( data ) {
		var basicObj = data[0];
		var emailObj = data[2];
		var extObj = data[3];
		// console.log(data,emailObj.ar_title[lang]);
		$("#pe_mail_cb").prop("value",JSON.stringify(emailObj));
		$("#pr_mail_cb").prop("value",JSON.stringify(emailObj));
 
		$(".pe_mail_text").append(emailObj.ar_title[lang]);

		// $("#pe_mail_text").append(emailObj.ar_title[lang]);

		$("#pe_ext_cb").prop("value",JSON.stringify(extObj));
		$("#pr_ext_cb").prop("value",JSON.stringify(extObj));

		$(".pe_ext_text").append(extObj.ar_title[lang]);
		pPkgHtml = '<span id="p_pkg" class="text_'+basicObj._id+'">'+basicObj.ar_discr[lang]+'<br></span>';
		$(".person_desc").append('<span class="person_pkg"></span>');
	})
}

function onAdditionalInfoChange(cb) {
	if(cb.id == "pe_mail_cb"){
		var emailHtml = "";
		pEmailTotal = 0;
		var personBillTotal = $(".person_btotal").first().text();
		personBillTotal = personBillTotal.replace(",",".");
		personBillTotal = personBillTotal.replace(".","");
		personBillTotal = Number(personBillTotal);

		// if(cb.checked){
			
		$('#descion_cont input:checked').each(function(i, el) {
			var obj = JSON.parse(el.value);
			var emailTitle = el.title;
			emailTitle = emailTitle.split("-");
			emailTitle = emailTitle[0];
			var emailCount = obj.email.count;
			var emailPrice = obj.email.price;
			var emailTPrice = emailCount * emailPrice;
			if(cb.checked){
				pEmailTotal += emailTPrice;
				personBillTotal += emailTPrice;
    			emailHtml += '<div class="em_'+el.id+'"><span><span style="display: inline;">'+emailTitle+'</span>		</span>		<span style="display: inline;">'+emailCount.toLocaleString("de-de")+' X &#8364; '+emailPrice.toLocaleString("de-de")+'=</span> &#8364;'+emailTPrice.toLocaleString("de-de")+'</span></div>';
    		}else{
    			pEmailTotal = 0;
				personBillTotal -= emailTPrice;
    		}
		});
		// }else{

		// }
		// personBillTotal += pEmailTotal;
		$(".person_btotal").text(personBillTotal.toLocaleString("de-de"));
		$(".pemail_bill").html(emailHtml);
	}

	if(cb.id == "pe_ext_cb"){
		var extHtml = "";
		pExtTotal = 0;
		var personBillTotal = $(".person_btotal").first().text();
		personBillTotal = personBillTotal.replace(",",".");
		personBillTotal = personBillTotal.replace(".","");
		personBillTotal = Number(personBillTotal);

		// if(cb.checked){
			
		$('#descion_cont input:checked').each(function(i, el) {
			var obj = JSON.parse(el.value);
			var extTitle = el.title;
			extTitle = extTitle.split("-");
			extTitle = extTitle[0];
			var extCount = obj.extension.count;
			var extPrice = obj.extension.price;
			var extTPrice = extCount * extPrice;
			if(cb.checked){
				pExtTotal += extTPrice;
				personBillTotal += extTPrice;
    			extHtml += '<div class="ext_'+el.id+'"><span><span style="display: inline;">'+extTitle+'</span>		</span>		<span style="display: inline;">'+extCount.toLocaleString("de-de")+' X &#8364;'+extPrice.toLocaleString("de-de")+'=</span> &#8364;'+extTPrice.toLocaleString("de-de")+'</span></div>';
    		}else{
    			pExtTotal = 0;
				personBillTotal -= extTPrice;
    		}
		});
		// }else{

		// }
		// personBillTotal += pEmailTotal;
		$(".person_btotal").text(personBillTotal.toLocaleString("de-de"));
		$(".ext_bill").html(extHtml);
	}
	var obj = JSON.parse(cb.value);
	var personPkgHtml = "";
	if(cb.checked){
		personPkgHtml += '<span class="text_'+obj._id+'">'+obj.ar_discr[lang]+'<br></span>';
		$(".person_pkg").append(personPkgHtml);
	}else{
		$('.text_'+obj._id).remove();
	}
	console.log("cb",cb);
}

function getSelections() {
	$.get( baseUrl+"selection/"+user.data._id, function( data ) {
		console.log("selections",data);
		var selectionHtml = "";
		console.log("selcs",data);
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			// console.log
			selectionHtml += '<tr>\n\
							<td class="Selection">'+obj.ussel_name+'</td>\n\
							<td class="lead">'+obj.numbers+'  <span onclick="onLoadSelection(\''+obj._id+'\')">Load</span></td>\n\
							<td class="del" id="'+obj._id+'" onclick="onDelSelection(this)"><img src="images/delete_icon.png" alt="" /></td>\n\
							</tr>';
		}
		$(".selection_cont").html(selectionHtml);
	})
}

function onLoadSelection(id) {
	console.log("id",id);
	// $("#main_cont").html(selHtmlArr[0]);
}

function onDelSelection(el) {
	$.ajax({
		url: baseUrl+'selection/'+el.id,
		type: 'DELETE',
		success: function(result) {
		    console.log("del selection res",result);
			getSelections();
		}
	});
	// console.log("id to del",el.id);
}
function onSaveSelection(el) {
	var selectionName = $("#"+el.name).val();
	$(".save_type_box").val("");
	var numberEl = $(".comp_count");
	// console.log("numberEl",$(numberEl[0]).text());

	var numbers = $(numberEl[0]).text();
	var obj = {
		us_id: user.data._id,
		ussel_name: selectionName,
		query: compCountObj,
		numbers: numbers
	}
	console.log("obj",obj);
	$.post( baseUrl+"selection", obj, function( data ) {
		console.log("post selection",data);
		getSelections();
	})
}

function getDescionPriorityText() {
	$.get( baseUrl+"prioritytext", function( data ) {
		var priorityHtml = "";
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			priorityHtml += '<option value="'+obj._id+'" class="pr_'+obj._id+'">'+obj.fu_title[lang]+'</option>';
		}
		$(".priority").append(priorityHtml);
	})
	var preVal,currVal;

    $(".priority").on('focus', function () {
        preVal = this.value;
    }).change(function() {
    	var prArr = [];
        console.log("pre",preVal);
		$(".pr_"+preVal).prop("disabled",false);

        currVal = this.value;
        console.log("current",currVal);
		$(".pr_"+currVal).prop("disabled",true);
		var isAnyRoleSelected = false;
		$(".priority").each(function() {
			// console.log(this.value);
			if(this.value !== "0"){
				isAnyRoleSelected = true;
			}
			prArr.push(this.value);
		})
		if(isAnyRoleSelected){
			$(".person_bill_cont").show();
		}else{
			$(".person_bill_cont").hide();
		}
		var compCount = $(".comp_count").first().text();
		compCount = compCount.replace(".","");
		compCount = compCount.replace(",",".");
		compCount = Number(compCount);
		compCountObj.priority = prArr;
		compCountObj.totalComp = compCount;
		console.log("compCountObj",compCountObj);
		$.post( baseUrl+"dmbypriority",compCountObj, function( data ) {
			// console.log("priority data",data);
			var prPricingHtml = "";
			var ftPrice = 0;
			for (key in data) {
				var obj = data[key];
				var roleID = obj.id;
				if(roleID != "0"){
					var optText = $(".pr_"+roleID).first().text();
					var count = obj.result;
					var price = obj.price;
					var tprice = count*price;
					tprice = tprice.toFixed(2);
					tprice = Number(tprice);
					ftPrice += tprice;
					prPricingHtml += '<li>\n\
										<div class="item_name" id="pr_title_'+roleID+'">'+optText+'</div>\n\
										<div class="item_price"><span id="pr_count_'+roleID+'">'+count.toLocaleString("de-de")+'</span> X &#8364; <span id="pr_price_'+roleID+'">'+price.toLocaleString("de-de")+'</span>  = &#8364; <span id="pr_tprice_'+roleID+'">'+tprice.toLocaleString("de-de")+'</span></div>\n\
										</li>';
					// console.log("optText",optText);
				}
			}
			var compInfoBTotal = $(".final_total_comp_info").first().text();
			compInfoBTotal = compInfoBTotal.replace(".","");
			compInfoBTotal = compInfoBTotal.replace(",",".");
			compInfoBTotal = Number(compInfoBTotal);
			var prBTotal = compInfoBTotal + ftPrice;
			// prPricingHtml += '<li>\n\
			// 				<div class="item_total"><span>Total: </span> &#8364; <span>'+ftPrice.toLocaleString("de-de")+'</span></div>\n\
			// 				</li>';
			$(".person_btotal").text(prBTotal.toLocaleString("de-de"));
			$("#pr_ptotal").text(ftPrice.toLocaleString("de-de"));
			$("#person_sum_total").text(ftPrice.toLocaleString("de-de"));
			$("#pr_pricing").html(prPricingHtml);
		})
    });
}

function onPriorityChange(val) {
	console.log("el",val);
	$(".pr_"+val).prop("disabled",true);
}

function onDescionMakerSelect() {
	console.log("onDescionMakerSelect");
	if($("#descion_cont input:checked").length == 0){
		$(".person_bill_cont").hide();
	}else{
		$(".person_bill_cont").show();
	}
	var compInfoBTotal = $(".final_total_comp_info").first().text();
	compInfoBTotal = compInfoBTotal.replace(".","");
	compInfoBTotal = compInfoBTotal.replace(",",".");
	compInfoBTotal = Number(compInfoBTotal);

	var descion_ptotal = $(".descion_ptotal").first().text();
	$("#person_sum_total").text(descion_ptotal);
	descion_ptotal = descion_ptotal.replace(".","");
	descion_ptotal = descion_ptotal.replace(",",".");
	descion_ptotal = Number(descion_ptotal);

	var pbTotal = descion_ptotal + compInfoBTotal;
	$(".person_btotal").text(pbTotal.toLocaleString("de-de"));
		// $('#text_'+obj._id).remove();
		var personPkgHtml = "";
		var mailObj = JSON.parse($("#pe_mail_cb").val());
		var extObj = JSON.parse($("#pe_ext_cb").val());

		// personPkgHtml += '<span class="text_'+mailObj._id+'">'+mailObj.ar_discr[lang]+'<br></span>';
		// personPkgHtml += '<span class="text_'+extObj._id+'">'+extObj.ar_discr[lang]+'<br></span>';
		$(".person_pkg").html("");
		if($("#pe_mail_cb").is(":checked")){
			// console.log("mailObj",mailObj);
			personPkgHtml += '<span class="text_'+mailObj._id+'">'+mailObj.ar_discr[lang]+'<br></span>';
		}

		if($("#pe_ext_cb").is(":checked")){
			// console.log("extObj",extObj);
			personPkgHtml += '<span class="text_'+extObj._id+'">'+extObj.ar_discr[lang]+'<br></span>';
		}
		$(".person_pkg").html(personPkgHtml);

}

function onPrioritySelect() {
	console.log("onPrioritySelect");
	var isAnyRoleSelected = false;
	$(".priority").each(function() {
		// console.log(this.value);
		if(this.value !== "0"){
			isAnyRoleSelected = true;
		}
	})
	if(isAnyRoleSelected){
		$(".person_bill_cont").show();
	}else{
		$(".person_bill_cont").hide();
	}
	var compInfoBTotal = $(".final_total_comp_info").first().text();
	compInfoBTotal = compInfoBTotal.replace(".","");
	compInfoBTotal = compInfoBTotal.replace(",",".");
	compInfoBTotal = Number(compInfoBTotal);

	var pr_ptotal = $("#pr_ptotal").text();
	$("#person_sum_total").text(pr_ptotal);
	pr_ptotal = pr_ptotal.replace(".","");
	pr_ptotal = pr_ptotal.replace(",",".");
	pr_ptotal = Number(pr_ptotal);

	var prTotal = pr_ptotal + compInfoBTotal;
	$(".person_btotal").text(prTotal.toLocaleString("de-de"));

	var personPkgHtml = "";
	var mailObj = JSON.parse($("#pr_mail_cb").val());
	var extObj = JSON.parse($("#pr_ext_cb").val());

	$(".person_pkg").html("");
	if($("#pr_mail_cb").is(":checked")){
		// console.log("mailObj",mailObj);
		personPkgHtml += '<span class="text_'+mailObj._id+'">'+mailObj.ar_discr[lang]+'<br></span>';
	}

	if($("#pr_ext_cb").is(":checked")){
		// console.log("extObj",extObj);
		personPkgHtml += '<span class="text_'+extObj._id+'">'+extObj.ar_discr[lang]+'<br></span>';
	}
	$(".person_pkg").html(personPkgHtml);
}

function getDescionMakerText() {
	// var priorityArr = [];
	$.get( baseUrl+"decisionmaker", function( data ) {
		var descionHtml = "";
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			descionHtml += '<h3>'+obj.name[lang]+'</h3>\n\
							<div class="open_details open_details2">\n\
							<ul class="country">';
			var dataObj = obj.data;
			console.log("descId",dataObj[0]._id);
			for (var j = 0; j < dataObj.length; j++) {
				var obj1 = dataObj[j];
				descionHtml += '<li>\n\
								<div>\n\
								<input id="descion_'+obj1._id+'" type="checkbox" class="dp_cb" onchange="onDescionPersonSelect(this,\''+obj1._id+'\')" title="'+obj1.fu_title[lang]+'">\n\
								<label for="descion_'+obj1._id+'" id="descion_label_'+obj1._id+'"><span></span>'+obj1.fu_title[lang]+'</label>\n\
								</div>\n\
								</li>';
			}
			descionHtml += '</ul></div>';
			// $("#descion_cont").ht
		}
		$("#descion_cont").html(descionHtml);
		$(".accordion2 .tool_tle").eq(0).addClass("active");
		$(".open_details").eq(0).show();

		// $(".accordion2 .tool_tle").eq(1).addClass("active");
		// $(".open_details").eq(1).show();

		// $(".accordion2 .tool_tle").eq(2).addClass("active");
		// $(".open_details").eq(2).show();

		// $(".accordion2 .tool_tle").eq(3).addClass("active");
		// $(".open_details").eq(3).show();

		// $(".accordion2 .tool_tle").eq(4).addClass("active");
		// $(".open_details").eq(4).show();

		// $(".accordion2 .tool_tle").eq(5).addClass("active");
		// $(".open_details").eq(5).show();

		// $(".accordion2 .tool_tle").eq(6).addClass("active");
		// $(".open_details").eq(6).show();

		$(".accordion2 .tool_tle").click(function(){
			// var el = $(this).context;
			// var cls = el.classList[1];
			// console.log("el",$("."+cls+":input:checked").length);
			// var self = this;
			$(this).next(".open_details").slideToggle("slow");
			$(this).toggleClass("active");

			$(this).next(".open_details").siblings(".open_details").each(function(i, el) {
				if($(el).find("input[type='text']").length>0){
					var isUsed = false;
					$(el).find("input[type='text']").each(function(j, fld) {
						if($(fld).val().length>0){
							isUsed = true;
						}
						// console.log(j,$(fld).val());
					})
					if(!isUsed){
						$(el).slideUp("slow");
				    	$(el).prev().removeClass("active");
					}
				}else{
					var checkedLen = $(el).find("input:checked").length;
					if(checkedLen == 0){
						$(el).slideUp("slow");
				    	$(el).prev().removeClass("active");
					}
				}
				
				
			    // console.log(i,$(el).find("input:checked").length);
			});
			// .siblings(".open_details:visible").slideUp("slow");
			// $(this).siblings(".tool_tle").removeClass("active");
		});

		// $(".accordion2 h3").eq(0).addClass("active");
		// $(".open_details").eq(0).show();

		$(".accordion2 h3").click(function(){
			$(this).next(".open_details").slideToggle("slow")
			.siblings(".open_details:visible").slideUp("slow");
			$(this).toggleClass("active");
			$(this).siblings("h3").removeClass("active");
		});
	})
}
var descionPTotal = 0;
var pEmailTotal = 0;
var pExtTotal = 0;
function onDescionPersonSelect(cb,id) {
	console.log("descionID",id);
	if($("#descion_cont input:checked").length == 0){
		$(".person_bill_cont").hide();
	}else{
		$(".person_bill_cont").show();
	}
	var obj = JSON.parse(cb.value);
	var title = cb.title;
	var count = obj.result;
	var price = obj.price;
	var total = (count*price).toFixed(2);
	total = Number(total);
	price = Number(price);
	var compInfoBTotal = $(".final_total_comp_info").first().text();
	compInfoBTotal = compInfoBTotal.replace(".","");
	compInfoBTotal = compInfoBTotal.replace(",",".");
	console.log("compInfoBTotal",compInfoBTotal);
	var personBillTotal;
	if(cb.checked){
		compCountObj.personsArr.push(id);
		if($("#pe_mail_cb").is(':checked')){

			var emailTitle = title.split("-");
			emailTitle = emailTitle[0];
			var emailCount = obj.email.count;
			var emailPrice = obj.email.price;
			var emailTPrice = emailCount * emailPrice;
			var emailHtml = '<div class="em_'+cb.id+'"><span><span style="display: inline;">'+emailTitle+'</span>		</span>		<span style="display: inline;">'+emailCount.toLocaleString("de-de")+' X &#8364;'+emailPrice.toLocaleString("de-de")+'=</span> &#8364;'+emailTPrice.toLocaleString("de-de")+'</span></div>';
			$(".pemail_bill").append(emailHtml);
			pEmailTotal += emailTPrice;

		}else{
			pEmailTotal = 0;
		}

		if($("#pe_ext_cb").is(':checked')){

			var extTitle = title.split("-");
			extTitle = extTitle[0];
			var extCount = obj.extension.count;
			var extPrice = obj.extension.price;
			var extTPrice = extCount * extPrice;
			var extHtml = '<div class="ext_'+cb.id+'"><span><span style="display: inline;">'+extTitle+'</span>		</span>		<span style="display: inline;">'+extCount.toLocaleString("de-de")+' X &#8364;'+extPrice.toLocaleString("de-de")+'=</span> &#8364;'+extTPrice.toLocaleString("de-de")+'</span></div>';
			$(".ext_bill").append(extHtml);
			pExtTotal += extTPrice;

		}else{
			pExtTotal = 0;
		}

		descionPTotal += total;
		descionPTotal = descionPTotal.toFixed(2);
		descionPTotal = Number(descionPTotal);
		personBillTotal = Number(compInfoBTotal)+descionPTotal+pEmailTotal+pExtTotal;
		personBillTotal = personBillTotal.toFixed(2);
		personBillTotal = Number(personBillTotal);
		var descPriceHtml = '<li class="dp_'+cb.id+'">\n\
							<div class="item_name" id="dp_title_'+cb.id+'">'+title+'</div>\n\
							<div class="item_price"><span id="dp_count_'+cb.id+'">'+count.toLocaleString("de-de")+'</span> X &#8364; <span id="dp_price_'+cb.id+'">'+price.toLocaleString("de-de")+'</span>  = &#8364; <span id="dp_tprice_'+cb.id+'">'+total.toLocaleString("de-de")+'</span></div>\n\
							</li>';
		var personBillHtml = '<span class="dp_'+cb.id+'" style="display:inline;"><span>'+count.toLocaleString("de-de")+' X &#8364; '+price.toLocaleString("de-de")+'=</span> &#8364;'+total.toLocaleString("de-de")+'</span>';
		$("#descion_price_cont").append(descPriceHtml);
		$(".descion_ptotal").text(descionPTotal.toLocaleString("de-de"));
		$("#person_sum_total").text(descionPTotal.toLocaleString("de-de"));
		$(".person_btotal").text(personBillTotal.toLocaleString("de-de"));

		console.log("l",$(".dp_cb:checked").length);
		if ($(".dp_cb:checked").length == 1){
			$(".person_desc").append(pPkgHtml);
		}
	}else{

		var ind = compCountObj.personsArr.indexOf(id);
		if (ind !== -1) compCountObj.personsArr.splice(ind, 1);
		
		$(".dp_"+cb.id).remove();

		descionPTotal -= Number(total);
		descionPTotal = descionPTotal.toFixed(2);
		descionPTotal = Number(descionPTotal);
		$(".descion_ptotal").text(descionPTotal.toLocaleString("de-de"));
		$("#person_sum_total").text(descionPTotal.toLocaleString("de-de"));
		personBillTotal = Number(compInfoBTotal)+descionPTotal;
		if($("#pe_mail_cb").is(':checked')){
			$(".em_"+cb.id).remove();
			var emailCount = obj.email.count;
			var emailPrice = obj.email.price;
			var emailTPrice = emailCount * emailPrice;
			pEmailTotal -= emailTPrice
			personBillTotal += pEmailTotal;
		}
		if($("#pe_ext_cb").is(':checked')){
			$(".ext_"+cb.id).remove();
			var extCount = obj.extension.count;
			var extPrice = obj.extension.price;
			var extTPrice = extCount * extPrice;
			pExtTotal -= extTPrice
			personBillTotal += pExtTotal;
		}
		$(".person_btotal").text(personBillTotal.toLocaleString("de-de"));
		console.log("l",$(".dp_cb:checked").length);

		if ($(".dp_cb:checked").length == 0){
			$("#p_pkg").remove();
		}
	}				
	console.log("compCountObj",compCountObj);
}
var compPackText = "";
function getCompoanyInfoText() {
	var compInfoPageHtml = "";
	$.get( baseUrl+"article/company", function( data ) {
		console.log("article data",data);
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			if(obj._id == "co_bas"){
				compPackText = obj.ar_discr[lang];
				// $(".comp_pack_text").text(compPackText);
				$(".comp_desc").append('<span class="info_c_'+obj._id+'" style="display:inline;">'+obj.ar_discr[lang]+'<br></span>');
			}
			var jsonString = JSON.stringify(obj);
			compInfoPageHtml += '<tr>\n\
								<td class="product_name">\n\
								<div class="pro_name">\n\
								<div>\n\
								<input id="'+obj._id+'" type="checkbox" name="" value=\''+jsonString+'\' onchange="onSelectCompInfo(this)">\n\
								<label for="'+obj._id+'"><span></span>'+obj.ar_title[lang]+'</label>\n\
								</div>\n\
								</div>\n\
								</td>\n\
								<td class="hide_small" id="num_'+obj._id+'"></td>\n\
								<td id="price_'+obj._id+'"></td>\n\
								<td id="tprice_'+obj._id+'"></td>\n\
								</tr>';
		}
		$("#comp_info_cont").html(compInfoPageHtml);
		// $('#co_bas').prop('checked', true);
		// $('#co_bas').prop('disabled', true);
	})
}

var finalTotalCompInfo = 0;

function onSelectCompInfo(cb) {
	// console.log($("#comp_info_cont").find("input:checked").length);

	if ($("#comp_info_cont").find("input:checked").length == 1) {
		$(".comp_info_bill_cont").hide();
	} else {
		$(".comp_info_bill_cont").show();
	}

	var obj = JSON.parse(cb.value);
	// console.log("obj",obj);
	var num = $("#num_"+obj._id).text();
	var price = $("#price_"+obj._id).text();
	var tprice = $("#tprice_"+obj._id).text();
	price = price.replace(/\u20ac/g, '');
	tprice = tprice.replace(/\u20ac/g, '');
	// console.log("price2",tprice.toLocaleString());
	tprice = tprice.replace(".","");
	tprice = tprice.replace(",",".");

	var comp_tprice = $(".comp_tprice").first().text();
	comp_tprice = comp_tprice.replace(".","");
	comp_tprice = comp_tprice.replace(",",".");
	comp_tprice = Number(comp_tprice);
	price = Number(price);
	num = Number(num);

	tprice = Number(tprice);
	tprice = tprice.toFixed(2);
	tprice = Number(tprice);

	if(cb.checked){
		compCountObj.infoValues.push(obj._id);
		finalTotalCompInfo += Number(tprice);
		var fprice = (finalTotalCompInfo+comp_tprice).toFixed(2);
		fprice = Number(fprice);
		$(".final_total_comp_info").text(fprice.toLocaleString("de-de"));
		$(".person_btotal").text(fprice.toLocaleString("de-de"));
		// console.log("num",num);
		$(".comp_desc").append('<span class="info_c_'+obj._id+'" style="display:inline;">'+obj.ar_discr[lang]+'<br></span>');
		// var compInfoBillHtml = '<span class="info_c_'+obj._id+'" style="display:inline;"><span>'+num.toLocaleString("de-de")+' X &#8364; '+price.toLocaleString("de-de")+'=</span> &#8364;'+tprice.toLocaleString("de-de")+'</span>';
		var compInfoBillHtml = '<div class="info_c_'+obj._id+'"><span><span style="display: inline;">'+obj.ar_title[lang]+'</span>		</span>		&#8364;<span style="display: inline;">'+tprice.toLocaleString("de-de")+'</span></div>'
		$(".comp_info_bill").append(compInfoBillHtml);
	// console.log("argument",JSON.parse(cb.value));
	}else{
		finalTotalCompInfo -= Number(tprice);
		// finalTotalCompInfo += comp_tprice;
		var fprice = (finalTotalCompInfo+comp_tprice).toFixed(2);
		fprice = Number(fprice);
		$(".final_total_comp_info").text(fprice.toLocaleString("de-de"));
		$(".person_btotal").text(fprice.toLocaleString("de-de"));
		$(".info_c_"+obj._id).remove();
		// console.log($("#comp_info_bill"));
		var index = compCountObj.infoValues.indexOf(obj._id);
		compCountObj.infoValues.splice(index, 1);
	}
	console.log("compCountObj",compCountObj);
}

function getAllStates() {
	$.get( baseUrl+"state/AT", function( data ) {
		console.log("states",data);
		for (var i = 0; i < data.length; i++) {
			stateHtml = '<div class="state_col AT">';
			if(lang == "en"){
				stateHtml += '<h2>Austria</h2>';
			}else{
				stateHtml += '<h2>Österreich</h2>';
			}
	 		stateHtml += '<ul class="list-unstyled components">';
	 		for (var i = 0; i < data.length; i++) {
        		var ob = data[i];
        		stateHtml += '<li>\n\
        					<div class="">\n\
        					<input id="checkbox'+ob._id+'" class="st" type="checkbox" name="AT" value="'+ob._id+'" onclick="onStateSelected(this)" >\n\
        					<label for="checkbox'+ob._id+'"><span></span><p>'+ob.state[lang]+'</p></label>\n\
        					</div></li>';
            }
        	stateHtml += '</ul></div>';
        	$("#state_cont" ).append( stateHtml );
		}
		$(".AT :input").prop("disabled", true);
		$(".AT label").css("color", "#a9a9a9");
		$.get( baseUrl+"state/CH", function( data ) {
		console.log("states",data);
		for (var i = 0; i < data.length; i++) {
			stateHtml = '<div class="state_col CH">';
			if(lang == "en"){
				stateHtml += '<h2>Switzerland</h2>';
			}else{
				stateHtml += '<h2>Schweiz</h2>'
			}
	 		stateHtml += '<ul class="list-unstyled components">';
	 		for (var i = 0; i < data.length; i++) {
        		var ob = data[i];
        		stateHtml += '<li>\n\
        					<div class="">\n\
        					<input id="checkbox'+ob._id+'" type="checkbox" name="CH" value="'+ob._id+'" onclick="onStateSelected(this)" >\n\
        					<label for="checkbox'+ob._id+'"><span></span><p>'+ob.state[lang]+'</p></label>\n\
        					</div></li>';
            }
        	stateHtml += '</ul></div>';
        	$("#state_cont" ).append( stateHtml );
		}
			$(".CH :input").prop("disabled", true);
			$(".CH label").css("color", "#a9a9a9");
			$.get( baseUrl+"state/DE", function( data ) {
			console.log("states",data);
			for (var i = 0; i < data.length; i++) {
				stateHtml = '<div class="state_col DE">';
				if(lang == "en"){
					stateHtml += '<h2>Germany</h2>';
				}else{
					stateHtml += '<h2>Deutschland</h2>'
				}
		 		stateHtml += '<ul class="list-unstyled components">';
		 		for (var i = 0; i < data.length; i++) {
	        		var ob = data[i];
	        		stateHtml += '<li>\n\
	        					<div class="">\n\
	        					<input id="checkbox'+ob._id+'" type="checkbox" name="DE" value="'+ob._id+'" onclick="onStateSelected(this)" >\n\
	        					<label for="checkbox'+ob._id+'"><span></span><p>'+ob.state[lang]+'</p></label>\n\
	        					</div></li>';
	            }
	        	stateHtml += '</ul></div>';
	        	$("#state_cont" ).append( stateHtml );
			}
			$(".DE :input").prop("disabled", true);
			$(".DE label").css("color", "#a9a9a9");
			})
		})
	})
	// $.get( baseUrl+"state/CH", function( data ) {
	// 	console.log("states",data);
	// 	for (var i = 0; i < data.length; i++) {
	// 		stateHtml = '<div class="state_col CH">';
	// 		if(lang == "en"){
	// 			stateHtml += '<h2>Switzerland</h2>';
	// 		}else{
	// 			stateHtml += '<h2>Schweiz</h2>'
	// 		}
	//  		stateHtml += '<ul class="list-unstyled components">';
	//  		for (var i = 0; i < data.length; i++) {
 //        		var ob = data[i];
 //        		stateHtml += '<li>\n\
 //        					<div class="">\n\
 //        					<input id="checkbox'+ob._id+'" type="checkbox" name="CH" value="'+ob._id+'" onclick="onStateSelected(this)" >\n\
 //        					<label for="checkbox'+ob._id+'"><span></span>'+ob.state[lang]+'</label>\n\
 //        					</div></li>';
 //            }
 //        	stateHtml += '</ul></div>';
 //        	$("#state_cont" ).append( stateHtml );
	// 	}
	// 	$(".CH :input").prop("disabled", true);
	// })
	// $.get( baseUrl+"state/DE", function( data ) {
	// 	console.log("states",data);
	// 	for (var i = 0; i < data.length; i++) {
	// 		stateHtml = '<div class="state_col DE">';
	// 		if(lang == "en"){
	// 			stateHtml += '<h2>Germany</h2>';
	// 		}else{
	// 			stateHtml += '<h2>Deutschland</h2>'
	// 		}
	//  		stateHtml += '<ul class="list-unstyled components">';
	//  		for (var i = 0; i < data.length; i++) {
 //        		var ob = data[i];
 //        		stateHtml += '<li>\n\
 //        					<div class="">\n\
 //        					<input id="checkbox'+ob._id+'" type="checkbox" name="DE" value="'+ob._id+'" onclick="onStateSelected(this)" >\n\
 //        					<label for="checkbox'+ob._id+'"><span></span>'+ob.state[lang]+'</label>\n\
 //        					</div></li>';
 //            }
 //        	stateHtml += '</ul></div>';
 //        	$("#state_cont" ).append( stateHtml );
	// 	}
	// 	$(".DE :input").prop("disabled", true);
	// })	
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function onJoin(e) {
	console.log("sadasd");
	e.preventDefault();
	var email = $("#j_email").val();
	var pass = $("#j_pass").val();
	if(email.length<1){
		$("#j_error").text("Email can't be black");
	}else if(pass.length<6){
		$("#j_error").text("Password atleast should be of 6 charachters.");
	}else if(!validateEmail(email)){
		$("#j_error").text("Email is not valid.");
	}else{
		var joinObj = {
			"us_email": email,
	    	"us_paswrd": pass
		}
		$.post( baseUrl+"join",joinObj, function( data ) {
			console.log(data);
			if(data.success){
				$("#j_error").text("");
				$(".close").click();
				$(".modal_login").modal('toggle');
			}else{
				$("#j_error").text(data.message);
			}
		})
	}
	// console.log(email,pass);
}

function onLogin(e) {
	e.preventDefault();
	var email = $("#l_email").val();
	var pass = $("#l_pass").val();
	if(email.length<1){
		$("#l_error").text("Email can't be black");
	}else if(pass.length<6){
		$("#l_error").text("Password atleast should be of 6 charachters.");
	}else if(!validateEmail(email)){
		$("#l_error").text("Email is not valid.");
	}else{
		var loginObj = {
			"us_email": email,
	    	"us_paswrd": pass
		}
		$.post( baseUrl+"login",loginObj, function( data ) {
			console.log("login res",data);
			if(data.success){
				localStorage.setItem("user",JSON.stringify(data));
				localStorage.setItem("profile",JSON.stringify(data.data));
				$("#l_error").text("");
				window.location.href = window.location.href.replace( /[\?#].*|$/, "");
			}else{
				$("#l_error").text(data.message);
			}
		})
	}
}

function onLogOut() {
	localStorage.removeItem("user");
	localStorage.removeItem("profile");
	location.reload();
}

function onLinkedInLogin() {
	IN.User.authorize(function() {
		console.log("authorized","onLinkedInLogin");
		IN.API.Raw("/people/~").result(function (response) {
			console.log(response);
			var joinObj = {
	     		name:response.firstName+" "+response.lastName,
	     		us_socialid: response.id
	     	}
			$.post( baseUrl+"join",joinObj, function( data ) {
				localStorage.setItem("user",JSON.stringify({data:data.data}));
				location.reload();
			})
		}).error(function (error) {
			console.log(error);
		});
	});
}

function onUpdateProfile(e) {
	e.preventDefault();
	var fname = $("#u_fname").val();
	var lname = $("#u_lname").val();
	var cname = $("#u_cname").val();
	var ustreet = $("#u_street").val();
	var uzip = $("#u_zip").val();
	var ucity = $("#u_city").val();
	var ucountry = $("#u_country").val();
	var ulang = $("#u_lang").val();
	var uvat = $("#u_vat").val();

	if(fname.length<1){
		$("#u_error").text("First name can't be blank.")
	}else if(lname.length<1){
		$("#u_error").text("Last name can't be blank.")
	}else if(cname.length<1){
		$("#u_error").text("Company name can't be blank.")
	}else if(ustreet.length<1){
		$("#u_error").text("Street can't be blank.")
	}else if(uzip.length<1){
		$("#u_error").text("Zip can't be blank.")
	}else if(ucity.length<1){
		$("#u_error").text("City can't be blank.")
	}else if(ucountry.length<1){
		$("#u_error").text("Country can't be blank.")
	}else if(uvat.length<1){
		$("#u_error").text("Vat can't be blank.")
	}else{
		var userData = user;
		if(userData.profile){
			userData = userData.profile;
		}else{
			userData = userData.data;
		}
		var userID = userData._id;
		console.log(userID,userData);

		// var updateProfileObj = {
		userData.us_firstname = fname;
		userData.us_lastname = lname;
		userData.us_coname = cname;
		userData.us_street = ustreet;
		userData.us_zip = uzip;
		userData.us_city = ucity;
		userData.us_country = ucountry;
		userData.us_language = ulang;
		userData.us_vat = uvat;
		// }
		delete userData['_id'];
		$.ajax({
			url: baseUrl+'join/'+userID,
			type: 'PUT',
			data:userData,
			success: function(result) {
			    console.log("update res",result);
			    user.profile = result.data;
			    localStorage.setItem("profile",JSON.stringify(result.data));
				$(".close").click();
				window.location.href = window.location.href.replace( /[\?#].*|$/, "" );

			}
		});

		console.log("updateProfileObj",userData);
		$("#u_error").text("")
	}

}

function onUpdateModalOpen() {
	if(localStorage.getItem("profile")){
		var profile = JSON.parse(localStorage.getItem("profile"));
		$("#u_fname").val(profile.us_firstname);
		$("#u_lname").val(profile.us_lastname);
		$("#u_cname").val(profile.us_coname);
		$("#u_street").val(profile.us_street);
		$("#u_zip").val(profile.us_zip);
		$("#u_city").val(profile.us_city);
		$("#u_country").val(profile.us_country);
		$("#u_lang").val(profile.us_language);
		$("#u_vat").val(profile.us_vat);
	}
}

function onForgotPassword(e) {
	e.preventDefault();
	var email = $("#fp_email").val();
	if(email.length<1){
		$("#fp_error").text("Email can't be blank");
	}else if(!validateEmail(email)){
		$("#fp_error").text("Enter valid email");
	}else{
		$("#fp_error").text("");
		var postObj = {
			us_email: email
		}
		$.post( baseUrl+"forgot-password",postObj, function( data ) {
			if(data.success){
				$("#fp_error").text("Password reset link sent to your email.");
			}else{
				$("#fp_error").text("No such email found.");
			}
			console.log("forgot-password res",data);
		})
	}
}

function onNewPassword(e) {
	e.preventDefault();
	var pass = $("#np_pass").val();
	var rpass = $("#np_rpass").val();
	if(pass.length<6 || rpass.length<6){
		$("#np_error").text("Enter password of atleast 6 charachters");
	}else if(rpass !== pass){
		console.log(pass,rpass);
		$("#np_error").text("Password doesn't match.");
	}else{
		$("#np_error").text("");
		var passObj = {
			us_paswrd: pass
		}
		$.ajax({
			url: baseUrl+'forgot-password/'+params.forgot,
			type: 'PUT',
			data:passObj,
			success: function(result) {
			    console.log("update pass res",result);
			    if(result.success){
			    	$(".close").click();
					$(".modal_login").modal("toggle");
			    }else{
			    	$("#np_error").text("Link expired! Click forgot password again.");
			    }
				
			}
		});
	}
}

function onLinkedInLoad() {
	console.log("onLinkedInLoad()","loaded");
}
var sectorPopupHtmlArr = [];
function getAllSectors() {
	$.get( baseUrl+"industry-sector", function( data ) {
    	console.log("sector data", data[0]);
    	var sectorHtml = '';

		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			if(i%1 == 0)
				sectorHtml += '<div class="col-md-4">';
			sectorHtml += '<div class="row_check">\n\
							<div class="tle clearfix">\n\
							<input id="'+obj.data._id+'" type="checkbox" name="sector'+i+'" class="select_all" onclick="onParentSectorChanged(this)" data-title="'+obj.data.Description[lang]+'">\n\
							<label for="'+obj.data._id+'"><span></span>'+obj.data.Description[lang]+'</label>\n\
							</div>\n\
							<div class="open_industry '+i+'">';
			for (var j = 0; j < obj.result.length; j++) {
				var resObj = obj.result[j];
				sectorHtml += '<li>\n\
								<div class="clearfix">\n\
								<input id="'+resObj._id+'" type="checkbox" name="'+resObj.sic_division_id+'" onclick="onMajorGroupChange(this)" data-title="'+resObj.Description[lang]+'" data-sictitle="'+obj.data.Description[lang]+'">\n\
								<label for="'+resObj._id+'"><span></span></label>\n\
								<a href="javascript:void(0)" style="display:inline;" class="close_pop '+resObj.sic_division_id+' '+resObj._id+'">'+resObj.Description[lang]+'</a>\n\
								</div>\n\
								</li>';
			}
			sectorHtml += '</div>';
			sectorHtml += '</div>';
			if(i%1 == 0)
				sectorHtml += '</div>';
		}
			// sectorHtml += '</div>';
    	$("#sector_cont" ).html( sectorHtml );

    	$("#checkAll").on('change',function(ev){
    		// console.log(ev);
			$("#sector_cont :input").prop('checked', ev.delegateTarget.checked);
		})

    	$(".close_pop").click(function (event) {
	    	var ids = event.target.classList;	
	    	console.log(event.target.classList);
	    	var popID = ids[1]+ids[2];
	    	var popObj = null;
	    	for (var x = 0; x < sectorPopupHtmlArr.length; x++) {
	    		var obj = sectorPopupHtmlArr[x];
	    		if(obj.id == popID){
	    			popObj = obj;
	    		}
	    	}
	    	if (popObj != null) {
	    		console.log("exists",popObj);
				$(".open_pop").css("display","block");
					$(".sec_pop").hide();
					$("#"+popID).show();
					$(".accordion_pop h3").eq(0).addClass("active");
					$(".pop_details").eq(0).show();

					$(".accordion_pop h3").click(function(){
						$(this).next(".pop_details").slideToggle("slow")
						.siblings(".pop_details:visible").slideUp("slow");
						$(this).toggleClass("active");
						$(this).siblings("h3").removeClass("active");
					});
				// console.log(e);
			}else{
		    	$.get( baseUrl+"industry-sector-level-4/"+ids[1]+"/"+ids[2], function( data ) {
		    		console.log("sec level 4 res",data);
		    		var sectorPopupHtml = '<div id="'+popID+'" class="sec_pop">';
		    		for (var i = 0; i < data.length; i++) {
		    			var obj = data[i];
		    			var dataObj = obj.data;
		    			sectorPopupHtml += '<div class="popup_col">\n\
		    								<div class="tle pop_tle clearfix">\n\
											<input id="sic_'+dataObj._id+'" type="checkbox" name="'+dataObj.sic_division_id+'"  onchange="onIndGrpChange(this)">\n\
											<label for="sic_'+dataObj._id+'"><span></span>'+dataObj.Description[lang]+'</label>\n\
											</div>\n\
											<div class="open_industry">';
		    			for (var j = 0; j < obj.result.length; j++) {
		    				var resObj = obj.result[j];
		    				sectorPopupHtml += '<li>\n\
												<div>\n\
												<input id="'+resObj._id+'" type="checkbox" value="'+resObj.sic_division_id+'" name="sic_'+resObj.sic_industrygroup_ID+'" onchange="onSicChange(this)" data-title="'+resObj.Description[lang]+'">\n\
												<label for='+resObj._id+'><span></span>'+resObj.Description[lang]+'</label>\n\
												</div>\n\
												</li>';
		    			}
		    			// sectorPopupHtml += '</ul>';
		    			sectorPopupHtml += '</div></div>';					
		    		}
		    		sectorPopupHtml += "</div>"
		    		var popupObj = {id:popID,val:sectorPopupHtml};
		    		sectorPopupHtmlArr.push(popupObj);
					$(".open_pop").css("display","block");
					$("#sector_pop").append(sectorPopupHtml);
					$(".sec_pop").hide();
					$("#"+popID).show();
					$(".accordion_pop h3").eq(0).addClass("active");
					$(".pop_details").eq(0).show();

					$(".accordion_pop h3").click(function(){
						$(this).next(".pop_details").slideToggle("slow")
						.siblings(".pop_details:visible").slideUp("slow");
						$(this).toggleClass("active");
						$(this).siblings("h3").removeClass("active");
					});
		    	})
	    	}
		
		});

		$(".close_pop").click(function () {
		$(".overlay_popup").css("display","block");
		});

		$(".overlay_popup").click(function () {
		$(".open_pop").css("display","none");
		$(".overlay_popup").css("display","none");
		});

		$(".cross").click(function () {
		$(".open_pop").css("display","none");
		$(".overlay_popup").css("display","none");
		});
    })
}
function onSicChange(cb) {
	console.log("sic cb",cb);
	if(cb.checked){
		if($('input[name='+cb.name+']:checked').length == $('input[name='+cb.name+']').length){
			$('input[id='+cb.name+']').prop("checked",true);
		}
		var sicTitle = $("#"+cb.value).data('title');
		var coSicTitle = $("#"+cb.id).data('title');
		var sic = {co_sic4:cb.id,title:coSicTitle};	
		if(compCountObj.sectors.length == 0){
			var obj = {
					co_sic_div:cb.value,
					title:sicTitle,
					data_inds : []
			};
			obj.data_inds.push(sic);
			compCountObj.sectors.push(obj);
		}else{
			var secObj = null;
			for (var i = 0; i < compCountObj.sectors.length; i++) {
				var sec = compCountObj.sectors[i];
				if(sec.co_sic_div == cb.value){
					secObj = sec;
				}
			}
			if(secObj == null){
				var obj = {
						co_sic_div:cb.value,
						title:sicTitle,
						data_inds : []
				};
				obj.data_inds.push(sic);
				compCountObj.sectors.push(obj);
			}else{
				if(!secObj.data_inds){
					secObj.data_inds = [];
				}
				secObj.data_inds.push(sic);
			}
		}
	}else{
		$('input[id='+cb.name+']').prop("checked",false);
		var sicObj = null;
		for (var i = 0; i < compCountObj.sectors.length; i++) {
			var sec = compCountObj.sectors[i];
			if(sec.co_sic_div == cb.value){
				sicObj = sec;
				var updatedSecData = $.grep(sec.data_inds,
                   function(o,i) { return o.co_sic4 === cb.id; },
                   true);
				sec.data_inds = updatedSecData;
			}
		}
		if(sicObj.data_inds.length == 0 && !(sicObj.data_major)){
			// console.log("indrObj",indrObj);
			var updatedSecData = $.grep(compCountObj.sectors,
                   function(o,i) { return o.co_sic_div === sicObj.co_sic_div; },
                   true);
			compCountObj.sectors = updatedSecData;
		}
	}
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
	console.log("compCountObj",compCountObj);

}

function onIndGrpChange(cb) {
	console.log("indgrp cb",cb);
	$('input[name='+cb.id+']').prop('checked', cb.checked);
	if(cb.checked){
		var indArr = $('input[name='+cb.id+']');
		var indData = [];
		var sicTitle = $("#"+cb.name).data('title');
		// var coSicTitle = $("#"+cb.id).data('title');
		for (var i = 0; i < indArr.length; i++) {
			var indr = indArr[i];
			var coSicTitle = $("#"+indr.id).data('title');
			indData.push({"co_sic4":indr.id,"title":coSicTitle});
		}
		// console.log("idrData",indData);
		var indrObj = null;
		for (var j = 0; j < compCountObj.sectors.length; j++) {
			var obj = compCountObj.sectors[j];
			if(obj.co_sic_div == cb.name){
				// obj.data_inds = [];
				if(obj.data_inds){
					indData = obj.data_inds.concat(indData);
					obj.data_inds = indData;
				}else{
					obj.data_inds = indData;
				}
				indrObj = obj;
			}
		}
		if(indrObj == null){
			indrObj = {co_sic_div:cb.name,title:sicTitle,data_inds:indData};
			compCountObj.sectors.push(indrObj);
		}
	}else{
		var indrObj = null;
		for (var j = 0; j < compCountObj.sectors.length; j++) {
			var obj = compCountObj.sectors[j];
			if(obj.co_sic_div == cb.name){
				indrObj = obj;
			}
		}
		var indArr = $('input[name='+cb.id+']');
		for (var i = 0; i < indArr.length; i++) {
			var indr = indArr[i];
			for (var k = 0; k < indrObj.data_inds.length; k++) {
				var item = indrObj.data_inds[k];
				if(item.co_sic4 == indr.id){
					indrObj.data_inds.splice(k,1);
				}
			}
		}
		// console.log("indrObj.data_inds.length",indrObj.data_inds.length);
		if(indrObj.data_inds.length == 0 && !(indrObj.data_major)){
			console.log("indrObj",indrObj);
			var updatedSecData = $.grep(compCountObj.sectors,
                   function(o,i) { return o.co_sic_div === indrObj.co_sic_div; },
                   true);
			compCountObj.sectors = updatedSecData;
		}
	}
	console.log("compCountObj",compCountObj);
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function getAllErps() {
	$.get( baseUrl+"erp", function( data ) {
		var erpHtml = '<div class="col-md-4">\n\
    					<ul class="country">';
		console.log("erp length",data.length);
		var divCount = (data.length/3).toFixed(0);
		console.log("erp length",divCount);

		var divCounter = 0;
		for (var i = 0; i < data.length; i++) {
			divCounter++;
			var obj = data[i];
			erpHtml += '<li>\n\
			        	<div>\n\
			            <input id="'+obj._id+'" type="checkbox" name="erpcheckbox" onchange="onErpChange(this)" data-title="'+obj.name+'">\n\
			            <label for="'+obj._id+'"><span></span><p>'+obj.name+'</p></label>\n\
			            </div>\n\
			        	</li>';
			if(divCounter == divCount){
				erpHtml += '</ul></div>';
				divCounter = 0;
				erpHtml += '<div class="col-md-4">\n\
    					<ul class="country">';
			}      	
		}
		erpHtml += '</ul></div>';
		erpHtml += '<div class="clear"></div>';
		$("#erp_cont").html(erpHtml);
	})
}
function getAllCrms() {
	$.get( baseUrl+"crm", function( data ) {
		var crmHtml = '<div class="col-md-4">\n\
    					<ul class="country">';
		console.log("erp length",data.length);
		var divCount = (data.length/3).toFixed(0);
		var divCounter = 0;
		for (var i = 0; i < data.length; i++) {
			divCounter++;
			var obj = data[i];
			crmHtml += '<li>\n\
			        	<div>\n\
			            <input id="'+obj._id+'" type="checkbox" name="erpcheckbox" onchange="onCrmChange(this)" data-title="'+obj.name+'">\n\
			            <label for="'+obj._id+'"><span></span><p>'+obj.name+'</p></label>\n\
			            </div>\n\
			        	</li>';
			if(divCounter == divCount){
				crmHtml += '</ul></div>';
				divCounter = 0;
				crmHtml += '<div class="col-md-4">\n\
    					<ul class="country">';
			}      	
		}
		crmHtml += '</ul></div>';
		crmHtml += '<div class="clear"></div>';
		$("#crm_cont").html(crmHtml);
	})
}
function onCrmChange(cb) {
	console.log("crm cb",cb);
	if(cb.checked){
		var title = $("#"+cb.id).data('title');
		var id = cb.id;
		var obj = {id:id,title:title};
		compCountObj.co_crm.push(obj);
	}else{
		var updatedCrmArr = $.grep(compCountObj.co_crm,
                   function(o,i) { return o.id === cb.id; },
                   true);
		compCountObj.co_crm = updatedCrmArr;
	}
	console.log("compCountObj",compCountObj);
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
		// if(Number(tprice)){

		// }
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onErpChange(cb) {
	console.log("erp cb",cb);
	if(cb.checked){
		var title = $("#"+cb.id).data('title');
		var id = cb.id;
		var obj = {id:id,title:title};
		compCountObj.co_erp.push(obj);
	}else{
		var updatedErpArr = $.grep(compCountObj.co_erp,
                   function(o,i) { return o.id === cb.id; },
                   true);
		compCountObj.co_erp = updatedErpArr;
	}
	console.log("compCountObj",compCountObj);
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onMajorGroupChange(cb) {
	console.log("onMajorGroupChange cb",cb);
	if(cb.checked){
		// $("#"+cb.name+":checked").length

		console.log($('#sector_cont input:checked').length,$('#sector_cont input[type=checkbox]').length);
		if($('#sector_cont input:checked').length == $('#sector_cont input[type=checkbox]').length-1){
			$("#checkAll").prop("checked",true);
		}
		if($('input[name='+cb.name+']:checked').length == $('input[name='+cb.name+']').length){
			$("#"+cb.name).prop("checked",true);
		}
		var mjrTitle = $("#"+cb.id).data('title');
		var sicTitle = $("#"+cb.id).data('sictitle');	
		var majgrp = {co_sic_majgrp:cb.id,title:mjrTitle};
		if(compCountObj.sectors.length == 0){
			var obj = {co_sic_div:cb.name,
				title:sicTitle,
				data_major : []
			};
			obj.data_major.push(majgrp);
			compCountObj.sectors.push(obj);
		}else{
			// $("#"+cb.name).prop("checked",false);
			var secObj = null;
			for (var i = 0; i < compCountObj.sectors.length; i++) {
				var sec = compCountObj.sectors[i];
				if(sec.co_sic_div == cb.name){
					secObj = sec;
				}
			}
			if(secObj == null){
				var obj = {co_sic_div:cb.name,
					title:sicTitle,
					data_major : []
				};
				obj.data_major.push(majgrp);
				compCountObj.sectors.push(obj);
			}else{
				if(!secObj.data_major){
					secObj.data_major = [];
				}
				secObj.data_major.push(majgrp);
			}
		}

	}else{
		$("#"+cb.name).prop("checked",false);
		$("#checkAll").prop("checked",false);
		// console
		for (var i = 0; i < compCountObj.sectors.length; i++) {
			var sec = compCountObj.sectors[i];
			if(sec.co_sic_div == cb.name){
				var updatedSecData = $.grep(sec.data_major,
                   function(o,i) { return o.co_sic_majgrp === cb.id; },
                   true);
				sec.data_major = updatedSecData;
				if(updatedSecData.length == 0){
					compCountObj.sectors.splice(i,1);	
				}
			}
		}
	}
	console.log("compCountObj",compCountObj);
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onParentSectorChanged(cb) {
	$('input[name='+cb.id+']').prop('checked', cb.checked);
	if(cb.checked){
		if($('#sector_cont input:checked').length == $('#sector_cont input[type=checkbox]').length){
			$("#checkAll").prop("checked",true);
		}
		var mjrArr = $('input[name='+cb.id+']');
		var mjrData = [];
		var sicTitle = $("#"+mjrArr[0].id).data('sictitle');	

		for (var i = 0; i < mjrArr.length; i++) {
			var mjr = mjrArr[i];
			var mjrTitle = $("#"+mjr.id).data('title');
			mjrData.push({"co_sic_majgrp":mjr.id,"title":mjrTitle});
		}
		console.log("mjrData",mjrData);
		var mjrObj = null;
		for (var i = 0; i < compCountObj.sectors.length; i++) {
			var obj = compCountObj.sectors[i];
			if(obj.co_sic_div == cb.id){
				obj.title = sicTitle;
				obj.data_major = [];
				obj.data_major = mjrData;
				mjrObj = obj;
			}
		}
		if(mjrObj == null){
			mjrObj = {co_sic_div:cb.id,title:sicTitle,data_major:mjrData};
			compCountObj.sectors.push(mjrObj);
		}
		// console.log("checks",$('input[name='+cb.id+']')[0]);
	}else{
		$("#checkAll").prop("checked",false);
		var updatedSectorsArray = $.grep(compCountObj.sectors,
                   function(o,i) { return o.co_sic_div === cb.id; },
                   true);
		compCountObj.sectors = updatedSectorsArray;
	}
	console.log("compCountObj",compCountObj);
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function toggleSectorCheck(cb) {
	// console.log($(".select_all"));
	// $(".select_all").prop('checked', cb.checked);
}
function onSelectAllChange(cb) {
	console.log("select_all_els",$(".select_all"));
	if(cb.checked){
		var selectAllArr = $(".select_all");
		compCountObj.sectors = [];
		for (var i = 0; i < selectAllArr.length; i++) {
			var el = selectAllArr[i];
			var sicTitle = $("#"+el.id).data('title');	
			var obj = {co_sic_div:el.id,title:sicTitle};
			var mjrArr = $('input[name='+el.id+']');
			var mjrData = [];
			for (var j = 0; j < mjrArr.length; j++) {
				var mjr = mjrArr[j];
				var mjrTitle = $("#"+mjr.id).data('title');	
				mjrData.push({"co_sic_majgrp":mjr.id,title:mjrTitle});
			}
			obj.data_major = mjrData;
			compCountObj.sectors.push(obj);
		}
		// console.log("all secs",compCountObj.sectors);
	}else{
		compCountObj.sectors = [];
	}
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
	console.log("compCountObj",compCountObj);
}
function onCountrySelected(cb){
	var country = cb.value;
	var cTitle = $("#"+cb.id).data('title');
	// console.log("country cb",$("#"+cb.id).data('title'));
	var obj = {_id:country,title:cTitle};
	if(cb.checked){
		obj.states = [];
		compCountObj.countries.push(obj);
		console.log("checked",compCountObj);
		$(".cal_loading").show();
		$(".cal").hide();
		$.post( baseUrl+"company",compCountObj, function( data ) {
  			console.log("count res",data);
  			$(".cal_loading").hide();
			$(".cal").show();
  			var tprice = (data.result*data.price).toFixed(2);
	  		tprice = Number(tprice).toLocaleString("de-de");
	  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
			$(".comp_price" ).html(data.price.toLocaleString("de-de"));
			$(".comp_tprice" ).html(tprice);
			$(".t_price" ).html(tprice);
			if(tprice == "0"){
				$(".comp_pack_text").text("");
			}else{
				$(".comp_pack_text").text(compPackText);
			}
		});
		$("."+country+" :input").prop("disabled", false);
		$("."+country+" label").css("color", "#000000");

		
	 	// $.get("https://poc-withease.c9users.io/state/"+country, function( stateData ) {
	 	// 	stateHtml = '<div class="state_col '+country+'">\n\
			// 				<h2>'+country+'</h2>\n\
	 	// 				<ul class="list-unstyled components">';
	 	// 	for (var i = 0; i < stateData.length; i++) {
   //          		var ob = stateData[i];
   //          		stateHtml += '<li>\n\
   //          					<div class="">\n\
   //          					<input id="checkbox'+ob._id+'" type="checkbox" name="'+country+'" value="'+ob._id+'" onclick="onStateSelected(this)" >\n\
   //          					<label for="checkbox'+ob._id+'"><span></span>'+ob.state.en+'</label>\n\
   //          					</div></li>';
   //          	}
   //          	stateHtml += '</ul></div>';
   //          	$("#state_cont" ).append( stateHtml );
	 	// })				
	}else{
		var updatedCountryArray = $.grep(compCountObj.countries,
                   function(o,i) { return o._id === cb.value; },
                   true);
		compCountObj.countries = updatedCountryArray;
		console.log("unchecked",compCountObj);

		// $("."+country ).remove();
		$(".cal_loading").show();
		$(".cal").hide();
		$.post( baseUrl+"company",compCountObj, function( data ) {
			$(".cal_loading").hide();
			$(".cal").show();
  			console.log("count res",data);
  			var tprice = (data.result*data.price).toFixed(2);
	  		tprice = Number(tprice).toLocaleString("de-de");
	  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
			$(".comp_price" ).html(data.price.toLocaleString("de-de"));
			$(".comp_tprice" ).html(tprice);
			$(".t_price" ).html(tprice);
			if(tprice == "0"){
				$(".comp_pack_text").text("");
			}else{
				$(".comp_pack_text").text(compPackText);
			}

		});
		$('input[name='+country+']').prop('checked', false);
		$("."+country+" :input").prop("disabled", true);
	}
}
function onStateSelected(cb) {
	var state = cb.value;
	var c_id = cb.name;
	if(cb.checked){
		$("#postcodes").prop("disabled",true);
		// console.log("state checked",cb);
		// console.log("c_id",c_id);
		var stateObj = {_id:state};
		// console.log(compCountObj.countries[0]._id);
		$.each(compCountObj.countries, function( index, ob ) {
			if(ob._id === c_id){
				ob.states.push(stateObj);
			}
		});
		console.log("state checked",compCountObj);
		$(".cal_loading").show();
		$(".cal").hide();
		$.post( baseUrl+"company",compCountObj, function( data ) {
			$(".cal_loading").hide();
			$(".cal").show();
  			console.log("count res",data);
  			var tprice = (data.result*data.price).toFixed(2);
	  		tprice = Number(tprice).toLocaleString("de-de");
	  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
			$(".comp_price" ).html(data.price.toLocaleString("de-de"));
			$(".comp_tprice" ).html(tprice);
			$(".t_price" ).html(tprice);
			if(tprice == "0"){
				$(".comp_pack_text").text("");
			}else{
				$(".comp_pack_text").text(compPackText);
			}

		});
	}else{
		if($("#state_cont input:checked").length == 0){
			$("#postcodes").prop("disabled",false);
		}
		$.each(compCountObj.countries, function( index, ob ) {
			if(ob._id === c_id){
				// ob.states.push(stateObj);
				var updatedStateArray = $.grep(ob.states,
                   function(o,i) { return o._id === state; },
                   true);
				ob.states = updatedStateArray;
			}
		});
		console.log("state unchecked",compCountObj);
		$(".cal_loading").show();
		$(".cal").hide();
		$.post( baseUrl+"company",compCountObj, function( data ) {
  			console.log("count res",data);
  			$(".cal_loading").hide();
			$(".cal").show();
  			var tprice = (data.result*data.price).toFixed(2);
	  		tprice = Number(tprice).toLocaleString("de-de");
	  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
			$(".comp_price" ).html(data.price.toLocaleString("de-de"));
			$(".comp_tprice" ).html(tprice);
			$(".t_price" ).html(tprice);
			if(tprice == "0"){
				$(".comp_pack_text").text("");
			}else{
				$(".comp_pack_text").text(compPackText);
			}
		});
	}
}
function onFromEmpCount(input) {
	// console.log($("#from_emp_count").val());
	var fromEmpCount = $("#from_emp_count").val();
	var toEmpCount = $("#to_emp_count").val();
	
	compCountObj.employeeFrom = fromEmpCount;
	compCountObj.employeeTo = toEmpCount;

	if(fromEmpCount.length>0 && toEmpCount.length>0){
		if(Number(fromEmpCount)>Number(toEmpCount)){
			compCountObj.employeeFrom = "";
			compCountObj.employeeTo = "";
		}
	}
	console.log("compCountObj",compCountObj);
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
	// $("#from_emp_count").val();
}
function onToEmpCount() {
	var fromEmpCount = $("#from_emp_count").val();
	var toEmpCount = $("#to_emp_count").val();
	compCountObj.employeeTo = toEmpCount;
	compCountObj.employeeFrom = fromEmpCount;

	if(fromEmpCount.length>0 && toEmpCount.length>0){
		if(Number(fromEmpCount)>Number(toEmpCount)){
			console.log(fromEmpCount,toEmpCount);
			compCountObj.employeeFrom = "";
			compCountObj.employeeTo = "";
		}
	}
	console.log("compCountObj",compCountObj);
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onFromPcCount() {
	// console.log($("#from_pc_count").val());
	var fromPcCount = $("#from_pc_count").val();
	var toPcCount = $("#to_pc_count").val();

	compCountObj.countpcFrom = fromPcCount;
	compCountObj.countpcTo = toPcCount;

	if(fromPcCount.length>0 && toPcCount.length>0){
		if(Number(fromPcCount)>Number(toPcCount)){
			compCountObj.countpcFrom = "";
			compCountObj.countpcTo = "";
		}
	}
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onToPcCount() {
	// console.log($("#to_pc_count").val());
	var toPcCount = $("#to_pc_count").val();
	var fromPcCount = $("#from_pc_count").val();

	compCountObj.countpcTo = toPcCount;
	compCountObj.countpcFrom = fromPcCount;

	if(fromPcCount.length>0 && toPcCount.length>0){
		if(Number(fromPcCount)>Number(toPcCount)){
			compCountObj.countpcFrom = "";
			compCountObj.countpcTo = "";
		}
	}

	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onFromTurnover() {
	// console.log($("#from_turnover").val());
	var fromTurnover = $("#from_turnover").val();
	var toTurnover = $("#to_turnover").val();

	compCountObj.turnoverFrom = fromTurnover;
	compCountObj.turnoverTo = fromTurnover;

	if(fromTurnover.length>0 && toTurnover.length>0){
		if(Number(fromTurnover)>Number(toTurnover)){
			compCountObj.turnoverFrom = "";
			compCountObj.turnoverTo = "";
		}
	}
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onToTurnover() {
	// console.log($("#to_turnover").val());
	var fromTurnover = $("#from_turnover").val();
	var toTurnover = $("#to_turnover").val();

	compCountObj.turnoverTo = toTurnover;
	compCountObj.turnoverFrom = fromTurnover;

	if(fromTurnover.length>0 && toTurnover.length>0){
		if(Number(fromTurnover)>Number(toTurnover)){
			compCountObj.turnoverFrom = "";
			compCountObj.turnoverTo = "";
		}
	}
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onFromFounded() {
	// console.log($("#from_founded").val());
	var fromFounded = $("#from_founded").val();
	var toFounded = $("#to_founded").val();

	if(fromFounded.length == 4 || fromFounded.length == 0){
		compCountObj.foudateFrom = fromFounded;
		compCountObj.foudateTo = toFounded;

		if(fromFounded.length>0 && toFounded.length>0){
			if(Number(fromFounded)>Number(toFounded)){
				compCountObj.fromFounded = "";
				compCountObj.toFounded = "";
			}
		}
		$(".cal_loading").show();
		$(".cal").hide();
		$.post( baseUrl+"company",compCountObj, function( data ) {
			$(".cal_loading").hide();
			$(".cal").show();
	  		console.log("count res",data);
	  		var tprice = (data.result*data.price).toFixed(2);
	  		tprice = Number(tprice).toLocaleString("de-de");
	  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
			$(".comp_price" ).html(data.price.toLocaleString("de-de"));
			$(".comp_tprice" ).html(tprice);
			$(".t_price" ).html(tprice);
			if(tprice == "0"){
				$(".comp_pack_text").text("");
			}else{
				$(".comp_pack_text").text(compPackText);
			}
	  	})
	  	console.log("compCountObj",compCountObj);
	}
}
function onToFounded() {
	// console.log($("#to_founded").val());
	var fromFounded = $("#from_founded").val();
	var toFounded = $("#to_founded").val();

	if(toFounded.length == 4 || toFounded.length == 0){
		compCountObj.foudateTo = toFounded;
		compCountObj.foudateFrom = fromFounded;

		if(fromFounded.length>0 && toFounded.length>0){
			if(Number(fromFounded)>Number(toFounded)){
				compCountObj.fromFounded = "";
				compCountObj.toFounded = "";
			}
		}

		$(".cal_loading").show();
		$(".cal").hide();
		$.post( baseUrl+"company",compCountObj, function( data ) {
			$(".cal_loading").hide();
			$(".cal").show();
	  		console.log("count res",data);
	  		var tprice = (data.result*data.price).toFixed(2);
	  		tprice = Number(tprice).toLocaleString("de-de");
	  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
			$(".comp_price" ).html(data.price.toLocaleString("de-de"));
			$(".comp_tprice" ).html(tprice);
			$(".t_price" ).html(tprice);
			if(tprice == "0"){
				$(".comp_pack_text").text("");
			}else{
				$(".comp_pack_text").text(compPackText);
			}
	  	})
	  	console.log("compCountObj",compCountObj);
	}
}
function onAddPostCode() {
	var postcodes = $("#postcodes" ).val();
	// console.log("postcodes",postcodes);
	compCountObj.co_poscode = postcodes;
	console.log("compCountObj",compCountObj);
	$(".cal_loading").show();
	$(".cal").hide();
	$.post( baseUrl+"company",compCountObj, function( data ) {
		$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})
}
function onFbLogin() {
	FB.login(function(response) {
	    if (response.authResponse) {
	     console.log('Welcome!  Fetching your information.... ');
	     FB.api('/me', function(response) {
	     	var joinObj = {
	     		name:response.name,
	     		us_socialid: response.id
	     	}
			$.post( baseUrl+"join",joinObj, function( data ) {
				localStorage.setItem("user",JSON.stringify({data:data.data}));
				location.reload();
			})
	     });
	    } else {
	     console.log('User cancelled login or did not fully authorize.');
	    }
	});
}
function onSumNextClick(nextID) {
	$("#"+nextID).click();
}
function onSumBackClick(backID) {
	$("#"+backID).click();
}
function onResetSelection() {
	// console.log("onResetSelection()");
	// $( "body" ).load( "init.html" );
	location.reload();
}
$( document ).ready(function() {
	console.log("loaded");
	// $(window).scroll(function(){
 //  		$("#summ").stop().animate({"marginTop": ($(window).scrollTop()) + "px", "marginLeft":($(window).scrollLeft()) + "px"}, "slow" );
	// });
	$(".comp_info_bill_cont").hide();
	$(".person_bill_cont").hide();

    $.get( baseUrl+"country", function( data ) {
    	console.log(data);
    	var countryHtml = '<ul class="country">';
    	for (var i = 0; i < data.length; i++) {
    		var obj = data[i];
    		countryHtml += '<li><div>\n\
    						<input id="checkbox'+i+'" type="checkbox" name="c_checkbox" value="'+obj._id+'" data-title="'+obj.title[lang]+'" onclick="onCountrySelected(this)">\n\
                            <label for="checkbox'+i+'"><span></span>'+obj.title[lang]+' </label>\n\
                            </div></li>';
    	}
    	countryHtml += '</ul>';
    	$("#country_cont" ).html( countryHtml );
	});

	getAllSectors();
	getAllErps();
	getAllCrms();
	getAllStates();
	loadAllText();
	getCompoanyInfoText();
	getDescionMakerText();
	getPersonsText();
	getDescionPriorityText();

	$("input[name='c_checkbox']:checked").on('change', function() {
    	var val = this.checked ? this.value : '';
    	console.log("val",val);
    	// $('#show').html(val);
	});
	$("#data_ic").on('click',function(e){
		$("#updateModal").modal("toggle");
	})

	$(".step").on('click',function(e){
		// console.log("clicked!!",$("#"+e.target.id).hasClass("reactive"));
		if($("#"+e.target.id).hasClass("reactive")){
			// var step = $("#progressbar li").eq($("fieldset").index(next_fs));
			// var stepID = step[0].id;
			var targetID = e.target.id;
			var curr_fs;
			var new_fs;
			var el = $(".step").filter(function () {
				return $(this).hasClass("active") && !($(this).hasClass('reactive'));
			});
			var step = el[0];
			var stepID = step.id; 
			// console.log("reactives",el[0]);

			// if(animating) return false;
			// animating = true;
			
			// $(".step").addClass("reactive");
			// $("#"+stepID).removeClass("active");
			$("#"+targetID).nextAll().removeClass("reactive");
			$("#"+targetID).nextAll().removeClass("active");
			$("#"+targetID).removeClass("reactive");
			$("#"+stepID).removeClass("active");

			// // $("#"+targetID).addClass("active");
			// // $("#"+targetID).prevAll().addClass("reactive");
			// console.log("next_fs",stepID);

			if(targetID == "step1_text"){
				new_fs = $("#1st_step");
			}else if(targetID == "step2_text"){
				new_fs = $("#2nd_step");
			}else if(targetID == "step3_text"){
				new_fs = $("#3rd_step");
			}else if(targetID == "step4_text"){
				new_fs = $("#4th_step");
			}else if(targetID == "step5_text"){
				new_fs = $("#5th_step");
			}

			if(stepID == "step1_text"){
				curr_fs = $("#1st_step");
			}else if(stepID == "step2_text"){
				curr_fs = $("#2nd_step");
			}else if(stepID == "step3_text"){
				curr_fs = $("#3rd_step");
			}else if(stepID == "step4_text"){
				curr_fs = $("#4th_step");
			}else if(stepID == "step5_text"){
				curr_fs = $("#5th_step");
			}


			new_fs.show(); 
			// curr_fs.hide();
			//hide the current fieldset with style
			curr_fs.animate({opacity: 0}, {
				step: function(now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50)+"%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					curr_fs.css({
		        //'transform': 'scale('+scale+')',
		        //'position': 'absolute'
		      });
					new_fs.css({'left': left, 'opacity': opacity});
				}, 
				duration: 00, 
				complete: function(){
					curr_fs.hide();
					animating = false;
				}, 
				//this comes from the custom easing plugin
				easing: ''
			});

			console.log(stepID,e.target);
		}
	})
	console.log($(".accordion2 h3::after"));
	$(".accordion2 h3::after").hover(function() {
		console.log("hovered");
        $(this).css('cursor','pointer').attr('title', 'This is a hover text.');
    }, function() {
        $(this).css('cursor','auto');
    });
	$(".cal_loading").show();
	$(".cal").hide();
    $.post( baseUrl+"company",compCountObj, function( data ) {
    	$(".cal_loading").hide();
		$(".cal").show();
  		console.log("count res",data);
  		var tprice = (data.result*data.price).toFixed(2);
  		tprice = Number(tprice).toLocaleString("de-de");
  		$(".comp_count" ).html(data.result.toLocaleString("de-de"));
		$(".comp_price" ).html(data.price.toLocaleString("de-de"));
		$(".comp_tprice" ).html(tprice);
		$(".t_price" ).html(tprice);
		if(tprice == "0"){
			$(".comp_pack_text").text("");
		}else{
			$(".comp_pack_text").text(compPackText);
		}
  	})

    // $( "body" ).load( "temp.html" );

$(".cal_loading").hide();
});

(function($) {
    var element = $('#summary_box1'),
        originalY = element.offset().top;
    
    // Space between element and top of screen (when scrolling)
    var topMargin = 20;
    
    // Should probably be set in CSS; but here just for emphasis
    element.css('position', 'relative');
    
    $(window).on('scroll', function(event) {
        var scrollTop = $(window).scrollTop();
        
        element.stop(false, false).animate({
            top: scrollTop < originalY
                    ? 0
                    : scrollTop - originalY + topMargin
        }, 100);
    });
})(jQuery);

// (function($) {
//     var element = $('#summary_box2'),
//         originalY = element.offset().top;
    
//     // Space between element and top of screen (when scrolling)
//     var topMargin = 20;
    
//     // Should probably be set in CSS; but here just for emphasis
//     element.css('position', 'relative');
    
//     $(window).on('scroll', function(event) {
//         var scrollTop = $(window).scrollTop();
        
//         element.stop(false, false).animate({
//             top: scrollTop < originalY
//                     ? 0
//                     : scrollTop - originalY + topMargin
//         }, 100);
//     });
// })(jQuery);

// (function($) {
//     var element = $('#summary_box3'),
//         originalY = element.offset().top;
    
//     // Space between element and top of screen (when scrolling)
//     var topMargin = 20;
    
//     // Should probably be set in CSS; but here just for emphasis
//     element.css('position', 'relative');
    
//     $(window).on('scroll', function(event) {
//         var scrollTop = $(window).scrollTop();
        
//         element.stop(false, false).animate({
//             top: scrollTop < originalY
//                     ? 0
//                     : scrollTop - originalY + topMargin
//         }, 100);
//     });
// })(jQuery);

