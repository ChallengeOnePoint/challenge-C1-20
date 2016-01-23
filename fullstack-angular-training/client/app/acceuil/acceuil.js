'use strict';

angular.module('workApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/acceuil', {
        templateUrl: 'app/acceuil/acceuil.html'
      });
  });
