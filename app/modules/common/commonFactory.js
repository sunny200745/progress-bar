'use strict';


angular.module('progressBarApp')
  

   /**
    * @ngdoc service
    * @name progressBarApp.CommonDatahub
    * @description
    * # CommonDatahub
    * Service used to fetch information for various modules
    * @requires  $q Dependencies in Service
    * @requires $http  Dependencies in Service
    */

  .factory('CommonDatahub', function ($http, $q, $timeout) {
    var loggedIn, email, pass, details, garageList;
    
    return {

      /**
       * @ngdoc function
       * @name progressBarApp.CommonDatahub#auth
       * @methodOf progressBarApp.CommonDatahub
       * @description
       * # auth
       * This dummy services ehich returns promise if email/password matches with localstorage details
       * @returns {object} Returns boolean value 
       */

      auth : function(login){

        return $q(function(resolve, reject){
          var loginObj = JSON.parse(localStorage.getItem('loginObject'));
          $timeout(function() {
            email = login.email === loginObj.email ? 'email' : 'error';
            pass = login.password === loginObj.password ? 'pass' : 'error';
            var res = (login.email === loginObj.email && login.password === loginObj.password);
            if(res){
              resolve(true);
            }else{
              reject(false);
            }
          }, 1000);

        });

      },
      /**
       * @ngdoc function
       * @name progressBarApp.CommonDatahub#getLoggedInDet
       * @methodOf progressBarApp.CommonDatahub
       * @description
       * # getLoggedInDet
       * This method returns whether the user is successfully logged in or not
       * @returns {object} Returns boolean value 
       */
      getLoggedInDet : function(){
        return loggedIn;
      },

      setLoggedInDet : function(d){
        loggedIn = d;
      },
      /**
       * @ngdoc function
       * @name progressBarApp.CommonDatahub#getSpecificError
       * @methodOf progressBarApp.CommonDatahub
       * @description
       * # getSpecificError
       * This method returns whether the user is successfully logged in or not
       * @returns {object} Return object with specific failure of username or password 
       */
      getSpecificError : function(){
        return {email:email,pass:pass};
      },
      
      getDataFromSource : function(){
        return $http({
          method: 'GET',
          url : 'http://demo7864104.mockable.io/data'
        }).then(
          function(response) {
            return response.data;
          },
          function(error) {
            return $q.reject(error);
          }
        );
      },
      setData : function(g){
        details = g;
      },
      getData : function(){
        return details;
      }
    }
  })