'use strict';

angular.module('workApp')
  .directive('projects', () => ({
    templateUrl: 'app/projects/projects.html',
    restrict: 'E',
    controller: 'ProjectsController',
    controllerAs: 'proj'
  }));
