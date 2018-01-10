'use strict';

describe('Controller: GarageCtrl', function () {
  var GarageCtrl,scope, location, q, httpBackend,CommonDatahub,html,element,compile;
  // load the controller's module
  beforeEach(module('progressBarApp'));

  var garageDetails = {
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
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $httpBackend, _CommonDatahub_, $location,$compile) {
    scope = $rootScope.$new();
    location = $location;
    q = $q;
    compile = $compile;
    CommonDatahub = _CommonDatahub_;
    httpBackend = $httpBackend;
    httpBackend.when('GET', 'modules/dashboard/dashboard.html').respond('');
    httpBackend.when('GET', 'modules/login/login.html').respond('');
    html = "<div id='map' ></div>";
    element = angular.element(html);
    element = compile(element)(scope);
    scope.$apply();
    GarageCtrl = $controller('GarageCtrl', {
      $scope: scope
    });
  }));

  
  describe('functions',function(){
    it('should be defined', function () {
      expect(GarageCtrl).toBeDefined();
    });

    it('should redirect to Login page if user is not Logged in',function(){
      spyOn(location, 'path'); 
      spyOn(CommonDatahub,'getLoggedInDet').and.returnValues(false);
      scope.garageInit();
      expect(location.path).toHaveBeenCalledWith('/login');

    });

    // it('should called the set the details of the garage on maps',function(){
    //   spyOn(CommonDatahub,'getLoggedInDet').and.returnValues(true);
    //   spyOn(CommonDatahub,'getGarageDetails').and.returnValues(garageDetails);
    //   console.debug("element",document.getElementById('map'));
    //   scope.garageInit();
    //   expect(scope.details.properties.cdk_id).toEqual('parking.garage.zd.p02.vumc.acta');
    // });
    

  });
});