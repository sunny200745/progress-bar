'use strict';

describe('Controller: DashboardCtrl', function () {
  var DashboardCtrl,scope, location, q, httpBackend,CommonDatahub;
  // load the controller's module
  beforeEach(module('progressBarApp'));

  var data = {
          "buttons": [15, 21, -42, -16],
          "bars": [55, 82, 51, 87],
          "limit": 140
        };

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
      spyOn(CommonDatahub,'getData').and.returnValues(data);
      scope.dashBoardInit();
      expect(scope.moduleName).toEqual('dashboard');
    });


    
    it('should do the calculations on the click of buttons',function(){
      scope.data = data;
      scope.selectedBar = 'progressBar_1';
      scope.clickButton(20);
      expect(scope.data.bars[1].value).toEqual(102);
    });

  });
});