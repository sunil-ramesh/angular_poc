'use strict';

 angular.module('nspAngularApp')
 .factory('createFeedsService', function (CreateFeeds, $http, ENV) {
  var obj = {
    create_feeds: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return CreateFeeds.createFeeds(params).$promise.then(success, failure);
    }
  };
  return obj;
});
