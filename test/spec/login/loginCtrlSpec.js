'use strict';

describe('Controller: LoginCtrl', function () {
  var LoginCtrl,scope, CommonDatahub, q, httpBackend, timeout,location;
  // load the controller's module
  beforeEach(module('progressBarApp'));

  var data = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "cdk_id": "parking.garage.zd.p02.vumc.acta",
        "title": "ZD-P02 VUmc (ACTA)",
        "layer": "parking.garage",
        "layers": {
          "parking.garage": {
            "data": {
              "Name": "ZD-P02 VUmc (ACTA)",
              "PubDate": "2016-08-15T09:50:42.190Z",
              "Type": "parkinglocation",
              "State": "ok",
              "FreeSpaceShort": 307,
              "FreeSpaceLong": 0,
              "ShortCapacity": 455,
              "LongCapacity": 0
            }
          }
        }
      },
      "geometry": {
        "type": "Point",
        "coordinates": [4.8609, 52.3362]
      }
    }]
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
      httpBackend.when('GET', 'http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25').respond(200, data);
      scope.email = 'b@b.com';
      scope.password = 'b';
      scope.fn_login();
      timeout.flush();
      expect(scope.loggedIn).toBe(true);
    });
    it('should call the factory login function with incorrect credentials',function(){
      httpBackend.when('GET', 'http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25').respond(200, data);
      scope.email = 'bc@b.com';
      scope.password = 'c';
      scope.fn_login();
      timeout.flush();
      expect(scope.loggedIn).toBe(false);
    });
    it('should call the GarageList API call if login Successful and if API success Redirect to Dashboard',function(){
      httpBackend.when('GET', 'http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25').respond(200, data);
      spyOn(location, 'path');
      spyOn(CommonDatahub,'getGaragesList').and.callFake(function() {
        return q.when(data.features);
      });
      scope.email = 'b@b.com';
      scope.password = 'b';
      scope.fn_login();
      timeout.flush();
      expect(location.path).toHaveBeenCalledWith('/dashboard');
    });
    it('should call the GarageList API call if login Successful and if API error Redirect to login',function(){
      httpBackend.when('GET', 'http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25').respond(500,data);
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