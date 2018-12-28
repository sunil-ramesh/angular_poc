'use strict';

angular
.module('nspAngularApp')
.controller('RegisterCtrl',['registerService', '$location', '$rootScope', '$scope', 'vcRecaptchaService', '$window', function (registerService, $location, $rootScope, $scope, vcRecaptchaService, $window) {

  var vm = this;

  vm.account = {};
  vm.authMsg = '';
  vm.registerForm = {} ;
  $rootScope.registrationSuccess = false;
  vm.emailExists =  false;
  vm.passwordMatch = true;
  vm.captcha = true;
  $scope.response = null;
  $scope.widgetId = null;

  $scope.setResponse = function (response) {
    $scope.response = response;
    vm.captcha = true;
  };

  $scope.setWidgetId = function (widgetId) {
    $scope.widgetId = widgetId;
  };

  $scope.cbExpiration = function() {
    vcRecaptchaService.reload($scope.widgetId);
    $scope.response = null;
  };


  vm.register = function() {

    vm.authMsg = '';

    if (vm.registerForm.$valid) {
    } else {
      vm.registerForm.first_name.$dirty = true;
      vm.registerForm.last_name.$dirty = true;
      vm.registerForm.zip_code.$dirty = true;
      vm.registerForm.e_mail.$dirty = true;
      vm.registerForm.account_password.$dirty = true;
      vm.registerForm.account_password_confirm.$dirty = true;
      vm.registerForm.account_agreed.$dirty = true;
      // vm.account_password_confirm.$dirty = true;
      // vm.account_password_confirm.$error.validator = true;
    }

    var params = {
      "user": {
        first_name: vm.registerForm.firstName,
        last_name: vm.registerForm.lastname,
        zipcode: vm.registerForm.zipcode,
        email: vm.registerForm.email,
        password: vm.registerForm.password,
        confirm_password: vm.registerForm.password_confirm
      }
    };
    console.log(params);
    if ($scope.response) {
      if (vm.registerForm.password === vm.registerForm.password_confirm ) {
        registerService.registerUser(params).then(function(response) {

          if (response.status === 201) {
            $location.path('/');
            $rootScope.registrationSuccess = true;
          } else if (response.errors[0] === "Email has already been taken") {
            vm.emailExists =  true;
            $window.scrollTo(0, 0);
          }
        });
      } else {
        vm.passwordMatch = false;
      }
    } else {
      vm.captcha = false;
    }
  };

  vm.clearFlags = function() {
    vm.emailExists =  false;
  };

  vm.passwordFlag = function() {
    vm.passwordMatch = true;
    vm.registerForm.account_password_confirm.$error.required = false;
  };

}]);
