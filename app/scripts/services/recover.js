'use strict';

 angular.module('nspAngularApp')
 .factory('recoverService', function (Recover, $http, ENV) {
  var obj = {
    reset: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Recover.reset(params).$promise.then(success, failure);
    }
  };
  return obj;
});