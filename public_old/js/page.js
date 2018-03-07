//onFieldChange();
initField();
var sicCount = 1;
var stateCount = 1;
var countryCount = 1;
var states = [];
var countries = [];

function initField() {
    // Might be changed to dynamic completion
    var foudateFrom = $("#foudateFrom");
    var foudateTo = $("#foudateTo");
    for( var i = 1900; i <= 2017; ++i) {
        foudateFrom.append($('<option>', {
            value: i,
            text: i
        }));
        foudateTo.append($('<option>', {
            value: i,
            text: i
        }));
    }
    $("#removeSic").hide();
    $("#removeState").hide();
    $("#removeCountry").hide();

  //  initStatesData();
}


function addSic() {
    sicCount++;
    $("#removeSic").show();
    var sicSpan = $("#sicInputs");
    sicSpan.append('<input type="text" ng-model="sic' + sicCount +'" name="sic" style="width:80px" ng-change="create()"  />')
}

function removeSic() {
    var sic = $("#sic" + sicCount);
    sic.remove();
    sicCount--;
    if (sicCount < 2) {
        $("#removeSic").hide();
    }
   
}

function addState() {
    stateCount++;
    $("#removeState").show();
    var stateSpan = $("#stateInputs");
    stateSpan.append('<select id="state'+stateCount+'" name="state" oninput="onFieldChange()" ><option value="">---</option></select>');
    initStateCombo($("#state" + stateCount));
}

function removeState() {
    var state = $("#state" + stateCount);
    state.remove();
    stateCount--;
    if (stateCount < 2) {
        $("#removeState").hide();
    }
   
}

function addCountry() {
    countryCount++;
    $("#removeCountry").show();
    var countrySpan = $("#countryInputs");
    countrySpan.append('<select id="country'+countryCount+'" name="country" oninput="onFieldChange()" ><option value="">---</option></select>');
    initCountryCombo($("#country" + countryCount));
}

function removeCountry() {
    var country = $("#country" + countryCount);
    country.remove();
    countryCount--;
    if (countryCount < 2) {
        $("#removeCountry").hide();
    }
   
}





