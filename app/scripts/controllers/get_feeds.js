'use strict';

angular
.module('nspAngularApp')
.controller('GetFeedsCtrl', function ($scope, getFeedsService, $location, Flash) {
  var vm = this;
  vm.account = {};
  vm.authMsg = '';
  vm.successMsg = '';
  vm.acts = [];

  vm.get_feeds = function() {
    vm.authMsg = '';
    if(vm.getFeedsForm.$valid) {
      getFeedsService.get_feeds().then(function(response) {
      	  vm.acts = response.activities.results
      });
    }
    else {
      vm.recoverForm.email.$dirty = true;
    }
  };
  $scope.isCollapsed = false;
});