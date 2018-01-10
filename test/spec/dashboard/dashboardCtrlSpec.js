'use strict';

describe('Controller: DashboardCtrl', function () {
  var DashboardCtrl,scope, location, q, httpBackend,CommonDatahub;
  // load the controller's module
  beforeEach(module('progressBarApp'));



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $httpBackend, _CommonDatahub_, $location) {
    scope = $rootScope.$new();
    location = $location;
    q = $q;
    CommonDatahub = _CommonDatahub_;
    httpBackend = $httpBackend;

    httpBackend.when('GET', 'modules/dashboard/dashboard.html').respond('');

    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  
  describe(' functions',function(){
    it('should be defined', function () {
      expect(DashboardCtrl).toBeDefined();
    });
    it('should redirect to Login page if user is not Logged in',function(){
      spyOn(location, 'path'); 
      spyOn(CommonDatahub,'getLoggedInDet').and.returnValues(false);
      scope.dashBoardInit();
      expect(location.path).toHaveBeenCalledWith('/login');

    });

    it('should redirect to Dashboard page if user is  Logged in',function(){
      spyOn(CommonDatahub,'getLoggedInDet').and.returnValues(true);
      scope.dashBoardInit();
      expect(scope.moduleName).toEqual('dashboard');
    });
    it('should redirect to garage details', function(){
      spyOn(location, 'path');
      var g = {
        properties : {
          cdk_id : 'parking.garage.zd.p02.vumc.acta'
        }
      };
      scope.openGarageDetails(g);
      expect(location.path).toHaveBeenCalledWith('/garage/list/parking.garage.zd.p02.vumc.acta');
    });

  });
});