'use strict';

 angular.module('nspAngularApp')
 .factory('createUserService', function (CreateUser, $http, ENV) {
  var obj = {
    createUser: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return CreateUser.createUser(params).$promise.then(success, failure);
    }
  };
  return obj;
});
