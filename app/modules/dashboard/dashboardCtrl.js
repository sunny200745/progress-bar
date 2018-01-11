'use strict';

/**
 * @ngdoc function
 * @name progressBarApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the progressBarApp
 */
angular.module('progressBarApp')
  .controller('DashboardCtrl', function ($scope, CommonDatahub, $location) {
    
    /**
     * @ngdoc function
     * @name dashBoardInit
     * @methodOf progressBarApp.controller:DashboardCtrl
     * @description
     * This method is called as soon as dashboard controller initalizes
     */
    var key;
    $scope.dashBoardInit = function(){
    	
      if(!CommonDatahub.getLoggedInDet()){
    		$location.path( "/login" );
    	}else{
    		$scope.moduleName = "dashboard";
        
        $scope.data  = CommonDatahub.getData();
        for(var i=0; i<$scope.data.bars.length; i++){
            key = "progressBar_"+ i;
            $scope.data.bars[i] = {name : key,value: $scope.data.bars[i], type:""};
        };
    	};
    };

    $scope.clickButton = function(val){
        for(var i=0; i<$scope.data.bars.length; i++){
            if($scope.data.bars[i].name === $scope.selectedBar){
                $scope.data.bars[i].value = $scope.data.bars[i].value + val;
                if($scope.data.bars[i].value > 100){
                    $scope.data.bars[i].type = "-danger";
                }else{
                    $scope.data.bars[i].type = "";
                }
                if($scope.data.bars[i].value < 0){
                    $scope.data.bars[i].value = 0;
                }
                break;
            }
        };
        
    };
    
  });
