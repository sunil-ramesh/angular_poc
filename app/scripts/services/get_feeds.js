'use strict';

 angular.module('nspAngularApp')
 .factory('getFeedsService', function (GetFeeds, $http, ENV) {
  var obj = {
    get_feeds: function() {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return GetFeeds.getFeeds().$promise.then(success, failure);
    }
  };
  return obj;
});