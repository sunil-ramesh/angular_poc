'use strict';

angular
.module('nspAngularApp')
.factory('personalInfoService', function($http, PersonalInfo) {

	var obj = {
		getZipcodeDetails: function(zipcode) {
			function success (response) {
				return response;
			}
			function failure (response) {
				return response;
			}
			return $http.get("http://maps.googleapis.com/maps/api/geocode/json?address="+zipcode).then(success, failure);
		},

		saveInfo: function(params) {
			function success (response) {
				return response;
			}
			function failure (response) {
				return response;
			}
			return PersonalInfo.saveData(params).$promise.then(success, failure);
		}

	};
	return obj;
});