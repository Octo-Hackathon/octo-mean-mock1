// app.js
var routerApp = angular.module('routerApp', ['ui.router','ui.grid']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/vendor');
    
    $stateProvider
        
        // Vendor STATES AND NESTED VIEWS ========================================
        .state('vendor', {
            url: '/vendor',
            templateUrl: 'partial-vendor.html'
        })
        
        // Buyer PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('buyer', {
            url: '/buyer',
            templateUrl: 'partial-buyer.html'  ,
        controller: function($scope, $http, $rootScope) {
		
		 // when landing on the page, get all registrations and show them
		$http.get('/api/buyerlist/mehulsoni@gmail.com')
        .success(function(data) {
            $rootScope.registrations = data;			
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
		
            //grid options
		$scope.gridOptions = { data: 'registrations', showGridFooter:true,
                       columnDefs: [{name:' ',cellTemplate:'<div><button ng-click="clickHandler()">Click Here</button></div>'},
                                    { field:"opTitle", headerCellClass: 'blue', displayName: " Opportunity"},
								   { field:"createdBy", headerCellClass: 'blue', displayName: "Agency"},
                                   { field:"perfPlace", headerCellClass: 'blue', displayName: "Location"},
								   { field:"setAside", headerCellClass: 'blue', displayName: "Set Aside"},
                                   { field:"opType", headerCellClass: 'blue', displayName: "Type"},                                   
								   { field:"publishedDt", headerCellClass: 'blue', displayName: "Posted On"},
                                   { field:"respDueDt", headerCellClass: 'blue', displayName: "Response Due Date"},
                                   { field:"opStatus", headerCellClass: 'blue', displayName: "Status"}]
                            };
        }     
        })
		
		// Create Opportunity STATES AND NESTED VIEWS ========================================
        .state('createOpportunity', {
            url: '/createOpportunity',
            templateUrl: 'partial-create-opportunity.html',
            controller: function($scope, $http, $state, $rootScope) {
            
             $scope.opportunity = {};
             $scope.isFormInvalid = false;

             // when submitting the opportunity form, send the text to the node API
            $scope.createOpportunity = function(isValid) { 
                if(!isValid){
                    $scope.isFormInvalid = true;
                    return false;
                } 
                $scope.opportunity.createdBy='mehulsoni@gmail.com';
                $http.post('/api/create', $scope.opportunity)
                    .success(function(data) {
                    if(data.hasOwnProperty('err')){
                        // $scope.validationErrors = data.err;
                        // $scope.showForm = true;
                        // $scope.showGrid = false;
                    } else {
                        $scope.opportunity = {}; // clear the form so our user is ready to enter another               
                        $rootScope.registrations = data;
                        $state.go('buyer');
                        // $scope.showForm = false;
                        // $scope.showGrid = true;
                    }              
                        console.log(data);
                    })
                    .error(function(data) {             
                        console.log('Error: ' + data);
                    });
            };
            
                
            
            }
        });
		
        
});

