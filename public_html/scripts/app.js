(function() {
    var app = angular.module('address book', []);
    
    app.directive('mainTemplate', function() {
       return {
           restrict: 'E',
           templateUrl: 'templates/main-template.html'          
       }; 
    });  
    
    app.controller('DataController', ['$scope','Backend', function($scope, Backend) {   
		this.init = function (){
			var self = this;
			Backend.loadRecords().then(function(rez){
				if(rez.data){
					self.data = rez.data;
					self.filterRecords();
				}
			});
		};
			
		this.filterRecords = function (){
			var filters = this.filters,
				filtered;
			
			filtered = this.data.map(function (record ,id){
				record.id = id;
				return record;
			});
			Object.keys(filters).forEach(function(f){
				if(!!filters[f]){
					filtered = filtered.filter(function(record){
						return record[f].indexOf(filters[f]) > -1; 
					});
				}
			});
			this.filtered = filtered;
		};
		
		this.updateRecord = function (index){
			var index,
				data; 
			
			if(typeof index === "undefined"){
				index = this.data.length;
				data = this.newRecord;
				this.newRecord = {};
			} else {
				data = this.filtered[index];
			}
			this.data[index] = data;
			Backend.updateRecord(index, data);
			this.filterRecords();
		};
		
		this.deleteRecord = function (index){
			var index;
			
			if(typeof index === "undefined"){
				return;
			} else {
				this.data.splice(index, 1);
			}
			Backend.deleteRecord(index);
			this.filterRecords();
		};
			
		this.filters = {
			name: '',
			phone: '',
			address: ''	
		};
		
		this.init();
    }]);
    
})();