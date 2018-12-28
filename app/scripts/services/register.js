'use strict';

angular
.module('nspAngularApp')
.factory('registerService', function(RegisterUser) {

  var obj = {
    registerUser: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return RegisterUser.register(params).$promise.then(success,failure);
    }
  };

  return obj;

});