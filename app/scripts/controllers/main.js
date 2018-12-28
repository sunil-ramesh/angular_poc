'use strict';

angular
.module('nspAngularApp')
.controller('MainCtrl', function ($rootScope, Idle, localStorageService, $location, Flash) {
    
  //For session timeout after 15min idle
  Idle.watch();
  $rootScope.$on('IdleTimeout', function() {
  	if(localStorageService.get('auth-token','sessionStorage')) {
  		Flash.clear();
  		localStorageService.clearAll();
  		Flash.create('danger', 'Your has Session Expired! Please login to continue.', 0, {container: 'flash-fixed'});
  		$location.path('/');
  		$rootScope.$apply();
  	}
  });

});
