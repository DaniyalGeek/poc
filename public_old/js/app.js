var app=angular.module('firstApp',['ui.router','restmod'])

.config(function ($stateProvider){
$stateProvider
			.state('find',{
				url:'/find',
				templateUrl:'./partials/find.html',
				controller:'find'

				})
});


app.controller('find',function($scope,company,state,$stateParams)
{

 users= company.$search().$then(function() {
		
		 $scope.count = users[0].result;
		 $scope.qtime = users[0].queryTime;
		 // console.log(users[0].result)
	});
   state= state.$search().$then(function() {
		
		 $scope.states = state;
		
	});
	
	$scope.sics = [{co_sic: ''}];
  
 $scope.addNewChoice = function() {
    var newItemNo = $scope.sics.length+1;
    $scope.sics.push({'co_sic':newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.sics.length-1;
    $scope.sics.splice(lastItem);
  };
  $scope.selectedValues = [];

  $scope.$watch('selected', function(nowSelected){
    // reset to nothing, could use `splice` to preserve non-angular references
  
    if( ! nowSelected ){
        // sometimes selected is null or undefined
        return;
    }

    // here's the magic
    angular.forEach(nowSelected, function(val){
        $scope.selectedValues.push( val.id.toString() );
    });
});

  	


	$scope.create=function(){
	
		var json = {  }

			if($scope.sics){
				console.log("i am in sic")

				json.co_sic=angular.toJson($scope.sics)
			}
			else{
				delete json.sic
			}
			if($scope.selectedValues != ""){
				console.log("i am in json")
				json.co_state=$scope.selectedValues
			}
			else{
				delete json.co_state
			}
			if($scope.country != ""){
				console.log("i am in country")
				// console.log($scope.country)
				json.co_country= $scope.country
			}
			else{
				delete json.co_country
			}
			if($scope.employeeFrom != ""){
				console.log("i am in employeeFrom")
				// console.log($scope.employeeFrom)
				json.employeeFrom= $scope.employeeFrom
			}
			else{
				delete json.employeeFrom
			}
			if($scope.employeeTo != ""){
				console.log("i am in employeeTo")
				// console.log($scope.employeeTo)
				json.employeeTo= $scope.employeeTo
			}
			else{
				delete json.employeeTo
			}
			if($scope.turnoverFrom != ""){
				console.log("i am in turnoverFrom")
				// console.log($scope.turnoverFrom)
				json.turnoverFrom= $scope.turnoverFrom
			}
			else{
				delete json.turnoverFrom
			}
			if($scope.turnoverTo != ""){
				console.log("i am in turnoverTo")
				// console.log($scope.turnoverTo)
				json.turnoverTo= $scope.turnoverTo
			}
			else{
				delete json.turnoverTo
			}
			if($scope.foudateFrom != ""){
				console.log("i am in foudateFrom")
				// console.log($scope.foudateFrom)
				json.foudateFrom= $scope.foudateFrom
			}
			else{
				delete json.foudateFrom
			}
			if($scope.foudateTo != ""){
				console.log("i am in foudateTo")
				// console.log($scope.foudateTo)
				json.foudateTo= $scope.foudateTo
			}
			else{
				delete json.foudateTo
			}
			

     
     
		 console.log("i am "+json)

	      user =   company.$create(json).$then(function() {
	      			console.log(user)
			      $scope.count = user[0].result;
				 $scope.qtime = user[0].queryTime;
	         });
	        	
			}

});


app.factory('company',function(restmod){
		 return restmod.model('https://poc-withease.c9users.io/company');

});
app.factory('state',function(restmod){
		 return restmod.model('https://poc-withease.c9users.io/state');

});


