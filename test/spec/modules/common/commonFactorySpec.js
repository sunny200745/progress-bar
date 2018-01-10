"use strict";
describe("CommonFactory  service", function () {
	var  CommonDatahub, httpBackend;
		
	beforeEach(module("progressBarApp"));
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

	it('should return GarageList if success', function () {
		httpBackend.expectGET('http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25').respond(200,data);
		CommonDatahub.getGaragesList().then(function () {
		});
		httpBackend.flush();
	});

	// it('should return GarageList if error', function () {
	// 	httpBackend.expectGET('http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25').respond(500,{});
	// 	CommonDatahub.getGaragesList().then(function () {
	// 	});
	// 	httpBackend.flush();
	// });

	it('should return Garage Details', function () {
		httpBackend.expectGET('http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25').respond(200,{});
		CommonDatahub.getGaragesList().then(function () {
		});
		httpBackend.flush();
	});


});
