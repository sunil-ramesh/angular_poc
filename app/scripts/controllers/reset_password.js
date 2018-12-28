'use strict';

angular
.module('nspAngularApp')
.controller('ResetPasswordCtrl', function ($scope, resetPasswordService, $location, Flash) {
  
  var vm = this;
  vm.account = {};
  vm.authMsg = '';
  vm.successMsg = '';

  if ($location.search().reset_password_token){
    $scope.token = $location.search().reset_password_token;
    resetPasswordService.resetToken($scope.token).then(function(response) {
      if(response.status == 200){
      debugger;
        vm.successMsg = response.message;
      } else {
        debugger;
        $location.path("/");
        Flash.create('danger', response.message, 10000, {container: 'flash-fixed'});
      }
    });
  }

  vm.removePassword = function (event) {
    if (event.keyCode === 8) {
      vm.reset.password='';
    }
  };

  vm.removeConfirmPassword = function (event) {
    if (event.keyCode === 8) {
      vm.reset.confirm_password='';
    }
  };

  vm.resetPassword = function() {
    alert("hi");
    if(vm.resetForm.$valid) {
      var params = {
        "user": {
          password: vm.reset.password,
          confirm_password: vm.reset.confirm_password,
          reset_password_token: $scope.token
        }
      }; 

      console.log(params);
      resetPasswordService.updatePassword(params).then(function(response) {
        debugger;
        if(response.status == 200){
          $location.path("/");
          Flash.create('success', response.message, 10000, {container: 'flash-fixed'});
        } else {
          Flash.create('danger', response.message, 10000, {container: 'flash-fixed'});
        }
      });
    } else {
      vm.loginForm.reset_password.$dirty = true;
      vm.loginForm.confirm_password.$dirty = true;
    }
  };
});
