'use strict';

describe('Controller: MainCtrl', function () {
  var MainCtrl,scope, location, q, httpBackend, CommonDatahub;
  // load the controller's module
  beforeEach(module('progressBarApp'));



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $httpBackend, $location, _CommonDatahub_) {
    scope = $rootScope.$new();
    location = $location;
    q = $q;
    httpBackend = $httpBackend;
    CommonDatahub = _CommonDatahub_;

    httpBackend.when('GET', 'modules/login/login.html').respond('');
    httpBackend.when('GET', 'modules/dashboard/dashboard.html').respond('');

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  
  describe('Main ctrl functions',function(){
    it('should be defined', function () {
      expect(MainCtrl).toBeDefined();
    });
    it('should redirect to dashboard',function(){
      spyOn(location, 'path');    
      scope.openDashboard();
      expect(location.path).toHaveBeenCalledWith('/dashboard');
    });
    it('should redirect to login',function(){
      spyOn(location, 'path');    
      scope.logout();
      expect(location.path).toHaveBeenCalledWith('/login');
    });
    it('should test the $watch ',function(){
      CommonDatahub.setLoggedInDet(true);
      scope.$digest();
      expect(scope.loggedIn).toEqual(true);
    });

  });
});