'use strict';

 angular.module('nspAngularApp')
 .factory('resetPasswordService', function (ResetPassword, $http, ENV) {
  var obj = {
    resetToken: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return ResetPassword.resetToken(params).$promise.then(success, failure);
    },
    updatePassword: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return ResetPassword.updatePassword(params).$promise.then(success, failure);
    }
  };
  return obj;
});
