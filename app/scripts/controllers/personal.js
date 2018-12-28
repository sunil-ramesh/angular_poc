'use strict';

angular
.module('nspAngularApp')
.controller('PersonalCtrl', function ($rootScope, personalInfoService, Idle, $location, localStorageService, Flash) {

  var vm = this;

  vm.account = {};
  vm.formMsg = '';  
  vm.submitted = false;
  vm.personalinfoForm = {} ;

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

  vm.personalinfoForm = localStorageService.get('userData', "sessionStorage");
  vm.getCityInfo = function() {
    personalInfoService.getZipcodeDetails(vm.personalinfoForm.zipcode).then(function(response) {
      if (response.status === 200) {
        var result = response.data.results;
        for (var component in result[0]['address_components']) {
          for (var i in result[0]['address_components'][component]['types']) {
            if (result[0]['address_components'][component]['types'][i] == "administrative_area_level_1") {
              vm.personalinfoForm.state = result[0]['address_components'][component]['short_name'];
              vm.personalinfoForm.city = result[0]['address_components'][1]['long_name'];
            }
          }
        }
      } 
    });
  };
  vm.getCityInfo();

  vm.sameAsAddress = function(status) {
    if(status){
      vm.personalinfoForm.mailingAddress = vm.personalinfoForm;
    }
    else{
      vm.personalinfoForm.mailingAddress = {};
    }
  };

  vm.personalinfo = function() {

    vm.submitted = true;
    vm.formMsg = '';

    var params = {
      "person":
      {
        "sub_ssn": vm.personalinfoForm.ssn,
        "primary_phone": vm.personalinfoForm.primary_phone,
        "user_id": vm.personalinfoForm.id,
        "alt_phone": vm.personalinfoForm.alt_phone,
        "date_of_birth": new Date(vm.personalinfoForm.dob),
        "addresses_attributes": 
        [{
          "address1": vm.personalinfoForm.address1,
          "address2": vm.personalinfoForm.address2,
          "city": vm.personalinfoForm.city,
          "state": vm.personalinfoForm.state,
          "country": "US",
          "address_type": "residential"
        },
        {
          "address1": vm.personalinfoForm.mailingAddress.address1,
          "address2": vm.personalinfoForm.mailingAddress.address2,
          "city": vm.personalinfoForm.mailingAddress.city,
          "state": vm.personalinfoForm.mailingAddress.state,
          "country": "US",
          "address_type": "office"
        }]
      }
    }

    personalInfoService.saveInfo(params).then(function(response) {
      if (response.status === 201) {
        $location.path('/successMsg');
      } else if(response.status === 404){
        Flash.create('danger', "Address not found. Please enter the valid address.", 5000, {container: 'flash-fixed'});
      }
    });

  };
});