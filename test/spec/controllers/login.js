'use strict';

describe('Controller: LoginCtrl', function() {

	beforeEach(module('nspAngularApp'));

	var LoginCtrl, scope, $location, LoginService, localStorageService;

	beforeEach(inject(function ($rootScope, $controller, $injector, _loginService_ , _localStorageService_) {
		$location=$injector.get('$location');
		scope = $rootScope.$new();
		LoginCtrl = $controller('LoginCtrl', {
			$scope: scope
		});
		LoginService = _loginService_;
		localStorageService = _localStorageService_;
	}));

	describe('Positive cases for the user login', function() {

		beforeEach(function() {
	    LoginCtrl.loginForm = {
				$valid : true
			};
	  });

		it('should set Login function', function() {
		   expect(LoginCtrl.login).toBeDefined();
		 });

		it('should redirect user to landing page for the valid credentials and success response', function() {
			LoginCtrl.account.email = 'user@test.com';
			LoginCtrl.account.password = 'test@123';

			var response = {
				"user": {
					"authentication_token": "PfZvyje9TEeP7uasrtHy"
				},
				"message": "User signin Successfully!",
				"success": true,
				"status": 200
			};

			spyOn(LoginService, 'userLogin').and.callFake(function() {
				return {
					then: function(callback) { return callback(response); }
				};
			});
			LoginCtrl.login();
			expect(LoginService.userLogin).toHaveBeenCalled();
			expect(localStorageService.get('auth-token')).toBe('PfZvyje9TEeP7uasrtHy');
			expect($location.path()).toBe('/create_account');
		});

		it('should give the proper error message for invalid user login', function() {
			LoginCtrl.account.email = 'invaliduser@test.com';
			LoginCtrl.account.password = 'test@123';

			var response = {
				"data" : {
					"error" : "Email or Password is wrong"
				}
			};

			spyOn(LoginService, 'userLogin').and.callFake(function() {
				return {
					then: function(callback) { return callback(response); }
				};
			});
			LoginCtrl.login();
			expect(LoginCtrl.authMsg).toBe(response.data.error);
		});

	});

	//==========  Negative Case =======================

	describe('Negative cases for the user login', function() {

		beforeEach(function() {
	    LoginCtrl.loginForm = {
				$valid : false,
				account_email : {},
				account_password : {}
			};
	  });

	  it('should not send request if form validation fails', function() {
		  spyOn(LoginService,'userLogin');
		  LoginCtrl.login();
		  expect(LoginService.userLogin).not.toHaveBeenCalled();
		});

	});

});