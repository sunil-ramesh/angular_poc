'use strict';

angular
.module('nspAngularApp')
.controller('LoginCtrl', function ($scope, loginService, localStorageService, $location) {
  
  var vm = this;
  vm.account = {};
  vm.authMsg = '';
  vm.successMsg = '';

  if ($location.search().confirmation_token){
    var token = $location.search().confirmation_token;
    loginService.userConfirmation(token).then(function(response) {
      if(response.status == 200){
        vm.successMsg = response.message;
      } else {
        vm.authMsg = response.error;
      }
    });
  }

  vm.login = function() {
    vm.authMsg = '';
    if(vm.loginForm.$valid) {
      var params = {
        "user": {
          email: vm.account.email,
          password: vm.account.password
        }
      };
      loginService.userLogin(params).then(function(response) {
        if(response.status == 200){
          localStorageService.set('auth-token', response.user.authentication_token, "sessionStorage");  //last parameter is to store in the session.
          localStorageService.set('userData', response.user, "sessionStorage");
          $location.path("/create_account");
        } else {
          vm.authMsg = response.data.error;
        }
      });
    } else {
      vm.loginForm.account_email.$dirty = true;
      vm.loginForm.account_password.$dirty = true;
    }
  };
});
