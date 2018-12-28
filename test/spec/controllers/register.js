'use strict';

describe('Controller: RegisterCtrl', function() {
  beforeEach(module('nspAngularApp'));

  var testRegisterCtrl, scope, $location, testRegisterService;

  beforeEach(inject(function ($rootScope, $controller, $injector, _registerService_) {

    $location = $injector.get('$location');
    scope = $rootScope.$new();
    testRegisterCtrl = $controller('RegisterCtrl', {
      $scope: scope
    });
    testRegisterService =  _registerService_;

  }));

  describe('Positive cases for user registration', function () {

    beforeEach(function () {
      testRegisterCtrl.registerForm = {
        $valid: true
      };
      testRegisterCtrl.registerForm.password = "Password";
      testRegisterCtrl.registerForm.password_confirm = "Password";
    });

    it('should set register function', function() {
      expect(testRegisterCtrl.register).toBeDefined();
    });

    it('should redirect user to login page for the valid input and success response', function() {
      testRegisterCtrl.registerForm.firstName = "John";
      testRegisterCtrl.registerForm.lastName = "Kennedy";
      testRegisterCtrl.registerForm.zipcode = "57001";
      testRegisterCtrl.registerForm.email = "john@qwinix.io";
      scope.response =  "value";

      var response = {
        "user" : {
          email: "john@qwinix.io",
          first_name: "John",
          last_name: "Kennedy",
          "zipcode": "57001"
        },
        "message": "A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.",
        "success": true,
        "status": 201
      };

      spyOn(testRegisterService,'registerUser').and.callFake(function() {
       return {
        then: function(callback) { return callback(response); }
      };
    });

      testRegisterCtrl.register();
      expect(testRegisterService.registerUser).toHaveBeenCalled();
      expect(response.user.email).toBe('john@qwinix.io')
      expect($location.path()).toBe('/');
    })

  })


});