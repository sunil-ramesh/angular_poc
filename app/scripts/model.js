'use strict';

angular
.module('nspAngularApp')
.factory('User', function ($resource, ENV) {
  return $resource(ENV.api_path + "api/v1/users",
  {
    format: 'json'
  },
  {
    login: {
      method: "Post",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users/sign_in"
    },
    userConfirmation: {
      method: "Get",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users/confirmation"
    }
  });
});

angular
.module('nspAngularApp')
.factory('RegisterUser', function ($resource, ENV) {
  return $resource(ENV.api_path + "api/v1/users",
  {
    format: 'json'
  },
  {
    register: {
      method: "Post",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users"
    }
  });
});

angular
.module('nspAngularApp')
.factory('PersonalInfo', function ($resource, ENV) {
  return $resource(ENV.api_path + "api/v1/people",
  {
    format: 'json'
  },
  {
    saveData: {
      method: "Post",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/people"
    }
  });
});

angular
.module('nspAngularApp')
.factory('Recover', function ($resource, ENV) {
  return $resource(ENV.api_path + "api/v1/users/password",
  {
    format: 'json'
  },
  {
    reset: {
      method: "Post",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users/password"
    }
  });
});

angular
.module('nspAngularApp')
.factory('ResetPassword', function ($resource, ENV) {
  return $resource(ENV.api_path + "api/v1/users/password",
  {
    format: 'json'
  },
  {
    resetToken: {
      method: "Get",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users/password/edit"
    },
    updatePassword: {
      method: "put",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users/password"
    }
  });
});

angular
.module('nspAngularApp')
.factory('CreateUser', function ($resource, ENV) {
  return $resource(ENV.api_path + "api/v1/users",
  {
    format: 'json'
  },
  {
    createUser: {
      method: "Post",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users"
    }
  });
});

angular
.module('nspAngularApp')
.factory('CreateFeeds', function ($resource, ENV) {
  return $resource(ENV.api_path + "api/v1/users/flat_feeds",
  {
    format: 'json'
  },
  {
    createFeeds: {
      method: "Post",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users/flat_feeds"
    }
  });
});

angular
.module('nspAngularApp')
.factory('GetFeeds', function ($resource, ENV) {
  return $resource(ENV.api_path + "api/v1/users/get_activities",
  {
    format: 'json'
  },
  {
    getFeeds: {
      method: "Get",
      headers: { 'Content-Type': 'application/json' },
      url: ENV.api_path + "api/v1/users/get_activities"
    }
  });
});

