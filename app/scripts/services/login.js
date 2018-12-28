'use strict';

 angular.module('nspAngularApp')
 .factory('loginService', function (User, $http, ENV) {
  var obj = {
    userLogin: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return User.login(params).$promise.then(success, failure);
    },
    userConfirmation: function(token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return User.userConfirmation({"confirmation_token": token}).$promise.then(success, failure);
    }
  };
  return obj;
});
