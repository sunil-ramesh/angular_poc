'use strict';

angular
.module('nspAngularApp')
.controller('CreateFeedCtrl', function ($scope, createFeedsService, $location, Flash) {
  var vm = this;
  vm.account = {};
  vm.authMsg = '';
  vm.successMsg = '';

  vm.create_feeds = function() {
    vm.authMsg = '';
    if(vm.feedsForm.$valid) {
      var params = {
        name: vm.feedsForm.name,
        tweet: vm.feedsForm.message
      };
      createFeedsService.create_feeds(params).then(function(response) {
        if(response.status == 201 && response.success == true){
          $location.path("/get_feeds");
          Flash.create('success', response.message, 10000, {container: 'flash-fixed'});
        }
      });
    }
    else {
      vm.feedsForm.name.$dirty = true;
      vm.feedsForm.message.$dirty = true;
    }
  };

  $scope.isCollapsed = false;

});