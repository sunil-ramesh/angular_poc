'use strict';

angular
.module('nspAngularApp')
.controller('CreateUserCtrl', function ($scope, createUserService, $location, Flash) {
  var vm = this;
  vm.account = {};
  vm.authMsg = '';
  vm.successMsg = '';

  vm.create_user = function() {
    vm.authMsg = '';
    if(vm.userForm.$valid) {
      var params = {
        name: vm.userForm.name,
        occupation: vm.userForm.occupation,
        gender: vm.userForm.gender
      };
      createUserService.createUser(params).then(function(response) {
        if(response.status == 201 && response.success == true){
          $location.path("/create_feeds");
          Flash.create('success', response.message, 10000, {container: 'flash-fixed'});
        }
      });
    }
    else {
      vm.userForm.name.$dirty = true;
      vm.userForm.occupation.$dirty = true;
      vm.userForm.gender.$dirty = true;
    }
  };

  $scope.isCollapsed = false;

});