'use strict';

angular.module('workApp.auth', [
  'workApp.constants',
  'workApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
