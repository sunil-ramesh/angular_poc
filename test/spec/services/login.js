'use strict';

describe('Service: LoginService', function() {

	beforeEach(module('nspAngularApp'));

	var LoginService, LoginService, $httpBackend, userModel, $q, params, returnData;

	beforeEach(inject(function ($injector, _loginService_, _User_, _$q_) {
		$httpBackend = $injector.get('$httpBackend');
		$q = _$q_;
		LoginService = _loginService_;
		userModel = _User_;
	}));
 
	describe('Testing $httpBackend requests', function () {
		beforeEach(function() {
			params = {
				"user" : { 
					"email": "user@test.com",
					"password": "test123",
					"password_confirmation": "test123"
				}
			};
			returnData = {};
		});

		it("expects POST http calls and returns mock data on success", function() {
			var response = {
				"user": {
					"authentication_token": "PfZvyje9TEeP7uasrtHy"
				},
				"message": "User signin Successfully!",
				"success": true,
				"status": 200
			};

			spyOn(userModel, 'login').and.callFake(function() {
				return {
					$promise:{ then: function(callback) { return callback(response); } }
				};
			});

			$httpBackend.expectPOST("http://localhost:3000/api/v1/users/sign_in").respond(returnData);
			var returnedPromise = LoginService.userLogin(params);
			expect(returnedPromise).toEqual(response);
		});

		it("expects POST http calls and returns mock data on failure", function() {
			var response = {
				"data" : {
					"error" : "Email or Password is wrong"
				}
			};
			var deferred = $q.defer();

			spyOn(userModel, 'login').and.callFake(function() {
				return {
					$promise:{ then: function(callback) { 
							deferred.reject(response);
        			return deferred.promise.$$state.value;
						} 
					}
				};
			});

			$httpBackend.expectPOST("http://localhost:3000/api/v1/users/sign_in").respond(returnData);
			var returnedPromise = LoginService.userLogin(params);
			expect(returnedPromise).toEqual(response);
		});

	});
});