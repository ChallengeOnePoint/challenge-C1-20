'use strict';

angular.module('workApp')
  .directive('projects', () => ({
    templateUrl: 'components/projects/projects.html',
    restrict: 'E',
    scope: {
    	http: $http
    },
    controller: ['$scope', function($scope) {
      var panes = $scope.panes = [];
      var http = $scope.http;
      
      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };

      this.addPane = function(pane) {
        if (panes.length === 0) {
          $scope.select(pane);
        }
        panes.push(pane);
      };
    }],
    controllerAs: 'proj'
  }));

