'use strict';

/**
 * @ngdoc function
 * @name progressBarApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the progressBarApp
 */
angular.module('progressBarApp')
  .controller('LoginCtrl', function ($scope, CommonDatahub, $location) {
    $scope.moduleName = "login";

    /**
     * @ngdoc function
     * @name fn_login
     * @methodOf progressBarApp.controller:LoginCtrl
     * @description
     * This method is when user hits the login button in oredr to login to the application
     */

    $scope.fn_login = function () {  
        var userObj = {
            'email' : $scope.email,
            'password' : $scope.password
        };

        CommonDatahub.auth(userObj).then(function(d){
            
            $scope.loggedIn = true;
            CommonDatahub.setLoggedInDet(true);
            CommonDatahub.getDataFromSource().then(function(res){
                CommonDatahub.setData(res);
                $location.path( "/dashboard" );
            },function(err){
                $location.path( "/login" );
            });
        },function(e){
            $scope.specificError = CommonDatahub.getSpecificError();
            $scope.loggedIn = false;
        });
    };
  })
