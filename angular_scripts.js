angular.module('app',[]);
angular.module('app').controller("Controller", function($http){
	var vm = this;
	vm.userName = '';
	vm.platform = '';
	vm.data = [];
	vm.characters=[];
	var membershipId = null;
	vm.clanName;
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
					//vm.characters.push(data.Response.characters);
					
					// var characterUrl = "http://www.bungie.net/Platform/Destiny/"+vm.platform+"/Account/"+membershipId+"/Character/2305843009225815639/";
					// console.log(vm.characters);
					//console.log(vm.characters);
				});
				var characterUrl = "http://www.bungie.net/Platform/User/GetBungieAccount/"+membershipId+"/"+vm.platform+"/";
				var responseCharcter = $http.get(characterUrl,
				{
					headers:{
						"X-API-Key": apiKey
					},
					responseType: "json"
				});
				responseCharcter.success(function(data){
					// console.log(data);
					var characters = data.Response.destinyAccounts[0].characters;		
					// console.log(characters);		
				    var guardians = [];
					var guardianUrl0 = "http://www.bungie.net/Platform/Destiny/Stats/"+vm.platform+"/"+membershipId+"/"+characters[0].characterId+"/";	
					var guardianUrl1 = "http://www.bungie.net/Platform/Destiny/Stats/"+vm.platform+"/"+membershipId+"/"+characters[1].characterId+"/";	
					var guardianUrl2 = "http://www.bungie.net/Platform/Destiny/Stats/"+vm.platform+"/"+membershipId+"/"+characters[2].characterId+"/";	
					var responseGuardians0 = $http.get(guardianUrl0,{headers:{"X-API-Key": apiKey}, reponseType: "json"});
					var responseGuardians1 = $http.get(guardianUrl1,{headers:{"X-API-Key": apiKey}, reponseType: "json"});
					var responseGuardians2 = $http.get(guardianUrl2,{headers:{"X-API-Key": apiKey}, reponseType: "json"});
					
					responseGuardians0.success(function(data){
							var kills = data.Response.allPvP.allTime.kills.basic.value;
							var assists = data.Response.allPvP.allTime.assists.basic.value;
							var deaths = data.Response.allPvP.allTime.deaths.basic.value;
							var key = 0;
							var guardianArray = {"characterId": characters[key].characterId,
											  "race":{
												  "raceName": characters[key].race.raceName
											  },
											  "gender":{
												  "genderName": characters[key].gender.genderName
											  },
											  "characterClass":{
												  "className": characters[key].characterClass.className
											  },
											  "stats":{
												  "kills": kills,
												  "assists": assists,
												  "deaths" : deaths
											  },
											  "powerLevel": characters[key].powerLevel
										};
								guardians.push(guardianArray);
							});
					responseGuardians1.success(function(data){
							var kills = data.Response.allPvP.allTime.kills.basic.value;
							var assists = data.Response.allPvP.allTime.assists.basic.value;
							var deaths = data.Response.allPvP.allTime.deaths.basic.value;
							var key = 1;
							var guardianArray = {"characterId": characters[key].characterId,
											  "race":{
												  "raceName": characters[key].race.raceName
											  },
											  "gender":{
												  "genderName": characters[key].gender.genderName
											  },
											  "characterClass":{
												  "className": characters[key].characterClass.className
											  },
											  "stats":{
												  "kills": kills,
												  "assists": assists,
												  "deaths" : deaths
											  },
											  "powerLevel": characters[key].powerLevel
										};
								guardians.push(guardianArray);
								console.log(vm.characters);
							});
							
							responseGuardians2.success(function(data){
							var kills = data.Response.allPvP.allTime.kills.basic.value;
							var assists = data.Response.allPvP.allTime.assists.basic.value;
							var deaths = data.Response.allPvP.allTime.deaths.basic.value;
							var key = 2;
							var guardianArray = {"characterId": characters[key].characterId,
											  "race":{
												  "raceName": characters[key].race.raceName
											  },
											  "gender":{
												  "genderName": characters[key].gender.genderName
											  },
											  "characterClass":{
												  "className": characters[key].characterClass.className
											  },
											  "stats":{
												  "kills": kills,
												  "assists": assists,
												  "deaths" : deaths
											  },
											  "powerLevel": characters[key].powerLevel
										};
								guardians.push(guardianArray);
								// console.log(guardians);
								vm.characters = guardians;
								// console.log(vm.characters);
							});
					
				
					//  vm.characters.push(data.Response.destinyAccounts[0].characters);
					// console.log(data.Response.destinyAccounts[0].characters);
				});
	 			
			});
	};
});