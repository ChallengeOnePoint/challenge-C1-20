'use strict';

(function() {

  class ProjectsController {
    constructor($location, Auth) {
      this.$http = $http;
      this.awesomeThings = [];

      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data;
        socket.syncUpdates('thing', this.awesomeThings);
      });

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }
  }

  angular.module('workApp')
  .controller('ProjectsController', ProjectsController);

})();
