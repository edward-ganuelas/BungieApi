angular.module('app',[]);
angular.module('app').controller("Controller", function($http){
	var vm = this;
	vm.userName = '';
	vm.platform = '';
	vm.data = [];
	vm.characters=[];
	vm.search = function(){	
		var apiKey = "";
		var url = "http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/"+vm.platform+"/"+vm.userName+"/";
		
		var responsePromise = $http.get(url,
			{
				headers:{
					 "X-API-Key": apiKey
				},
				responseType: "json"
			}
		);
	 	responsePromise.success(function(data){
		 membershipId = data.Response[0].membershipId;
		 var statsUrl = "http://www.bungie.net/Platform/Destiny/Stats/Account/"+vm.platform+"/"+membershipId+"/";
		 var responseStats = $http.get(statsUrl,
		 {
			 headers:{
					 "X-API-Key": apiKey
				},
				responseType: "json"
		 }
		 );
		 responseStats.success(function(data){
			//console.log(data.Response); 
			vm.data.push(data.Response.mergedAllCharacters.results.allPvP.allTime);
			vm.characters.push(data.Response.characters);
			
			var characterUrl = "http://www.bungie.net/Platform/Destiny/"+vm.platform+"/Account/"+membershipId+"/Character/2305843009225815639/";
			var responseCharcter = $http.get(characterUrl,
			{
				 headers:{
					 "X-API-Key": apiKey
				},
				responseType: "json"
			});
			responseCharcter.success(function(data){
				console.log(data);
			});
			
		 });
	 });
	};
});