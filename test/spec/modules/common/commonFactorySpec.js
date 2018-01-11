"use strict";
describe("CommonFactory  service", function () {
	var  CommonDatahub, httpBackend;
		
	beforeEach(module("progressBarApp"));
	var data = {
					"buttons": [15, 21, -42, -16],
					"bars": [55, 82, 51, 87],
					"limit": 140
				};
	beforeEach(inject(function ($httpBackend,_CommonDatahub_) {
		CommonDatahub = _CommonDatahub_;
		httpBackend = $httpBackend;

		httpBackend.when('GET', 'modules/login/login.html').respond('');
    	httpBackend.when('GET', 'modules/dashboard/dashboard.html').respond('');
	}));

	it('should return the loggedIn details ', function () {
		CommonDatahub.setLoggedInDet(true);
		expect(CommonDatahub.getLoggedInDet()).toEqual(true);
	});

	it('should return Data Source if success', function () {
		httpBackend.expectGET('http://demo7864104.mockable.io/data').respond(200,data);
		CommonDatahub.getDataFromSource().then(function () {
		});
		httpBackend.flush();
	});


	it('should return Data Source Details', function () {
		httpBackend.expectGET('http://demo7864104.mockable.io/data').respond(200,{});
		CommonDatahub.getDataFromSource().then(function () {
		});
		httpBackend.flush();
	});


});
