angular.module('address book')
.service('Backend', ['$http',
	function($http){
		this.url = "";
		
		this.loadRecords = function (){
			return $http({
				method: 'GET',
				url: 'data/data.json'
			});
		};
		
		this.updateRecord = function (index, data){
			return $http({
				method: 'POST',
				data: {
					id: index,
					data: data
				},
				url: this.url
			});
		};
		
		this.deleteRecord = function (index){
			return $http({
				method: 'POST',
				data: {
					id: index
				},
				url: this.url
			});
		};
	}
]);