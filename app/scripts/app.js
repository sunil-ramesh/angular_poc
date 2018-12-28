'use strict';

/**
 * @ngdoc overview
 * @name nspAngularApp
 * @description
 * # nspAngularApp
 *
 * Main module of the application.
 */
angular
  .module('nspAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'config',
    'LocalStorageModule',
    'ngIdle',
    'ngFlash',
    'vcRecaptcha',
    'ui.mask',
    'ui.bootstrap',
  ])
  .config(function ($routeProvider, IdleProvider, KeepaliveProvider, FlashProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
      })
      .when('/register', {
        templateUrl: 'views/content/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'reg'
      })
      .when('/', {
        templateUrl: 'views/content/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/create_account', {
        templateUrl: 'views/content/personal_info.html',
        controller: 'PersonalCtrl',
        controllerAs: 'psn'
      })
      .when('/successMsg', {
        templateUrl: 'views/content/successMsg.html'
      })
      .when('/forgot_password', {
        templateUrl: 'views/content/forgot_password.html',
        controller: 'RecoverCtrl',
        controllerAs: 'rcvr'
      })
      .when('/reset_password', {
        templateUrl: 'views/content/reset_password.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'resp'
      })
      .when('/create_feeds', {
        templateUrl: 'views/content/create_feeds.html',
        controller: 'CreateFeedCtrl',
        controllerAs: 'feeds'
      })
      .when('/create_user', {
        templateUrl: 'views/content/create_user.html',
        controller: 'CreateUserCtrl',
        controllerAs: 'user'
      })
      .when('/get_feeds', {
        templateUrl: 'views/content/get_feeds.html',
        controller: 'GetFeedsCtrl',
        controllerAs: 'gtf'
      })
      .otherwise({
        redirectTo: '/'
      });

    IdleProvider.idle(15*60); // 15 minutes idle
    IdleProvider.timeout(1); // after 1 seconds idle, time to user logout

    FlashProvider.setShowClose(true);
  });
