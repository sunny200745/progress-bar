'use strict';

describe('Controller: LoginCtrl', function () {
  var LoginCtrl,scope, CommonDatahub, q, httpBackend, timeout,location;
  // load the controller's module
  beforeEach(module('progressBarApp'));

  var data = {
          "buttons": [15, 21, -42, -16],
          "bars": [55, 82, 51, 87],
          "limit": 140
        };
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _CommonDatahub_, $q, $httpBackend, _$timeout_, $location) {
    scope = $rootScope.$new();
    timeout = _$timeout_;
    q = $q;
    CommonDatahub = _CommonDatahub_;
    httpBackend = $httpBackend;
    location = $location;

    
    httpBackend.when('GET', 'modules/login/login.html').respond('');
    httpBackend.when('GET', 'modules/dashboard/dashboard.html').respond('');
    


    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  
  it('should be defined', function () {
    expect(LoginCtrl).toBeDefined();
  });

  describe('Login Function',function(){
    it('should call the factory login function with correct credentials',function(){
      httpBackend.when('GET', 'http://demo7864104.mockable.io/data').respond(200, data);
      scope.email = 'b@b.com';
      scope.password = 'b';
      scope.fn_login();
      timeout.flush();
      expect(scope.loggedIn).toBe(true);
    });
    it('should call the factory login function with incorrect credentials',function(){
      httpBackend.when('GET', 'http://demo7864104.mockable.io/data').respond(200, data);
      scope.email = 'bc@b.com';
      scope.password = 'c';
      scope.fn_login();
      timeout.flush();
      expect(scope.loggedIn).toBe(false);
    });
    it('should call the getDataFromSource API call if login Successful and if API success Redirect to Dashboard',function(){
      httpBackend.when('GET', 'http://demo7864104.mockable.io/data').respond(200, data);
      spyOn(location, 'path');
      spyOn(CommonDatahub,'getDataFromSource').and.callFake(function() {
        return q.when(data);
      });
      scope.email = 'b@b.com';
      scope.password = 'b';
      scope.fn_login();
      timeout.flush();
      expect(location.path).toHaveBeenCalledWith('/dashboard');
    });
    it('should call the getDataFromSource API call if login Successful and if API error Redirect to login',function(){
      httpBackend.when('GET', 'http://demo7864104.mockable.io/data').respond(500,data);
      spyOn(location, 'path');
      scope.email = 'b@b.com';
      scope.password = 'b';
      scope.fn_login();
      timeout.flush();
      httpBackend.flush();
      expect(location.path).toHaveBeenCalledWith('/');
    });
  });
});