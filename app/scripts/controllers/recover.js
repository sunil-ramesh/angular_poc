'use strict';

angular
.module('nspAngularApp')
.controller('RecoverCtrl', function ($scope, recoverService, $location, Flash) {
	var vm = this;
  vm.account = {};
  vm.authMsg = '';
  vm.successMsg = '';

  vm.reset = function() {
    vm.authMsg = '';
    if(vm.recoverForm.$valid) {
      var params = {
        email: vm.recoverForm.email_id
      };
      recoverService.reset(params).then(function(response) {
        if(response.status == 200 || (response.status == 422 && response.success == true)){
          debugger;
          $location.path("/");
          Flash.create('success', response.message, 10000, {container: 'flash-fixed'});
        }
      });
    }
    else {
      vm.recoverForm.email.$dirty = true;
    }
  };

});