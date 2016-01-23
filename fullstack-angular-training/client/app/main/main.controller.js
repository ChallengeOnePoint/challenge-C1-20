'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
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

    addThing() {
      if (this.newThing) {
        if (this.newThingInfo)
          this.$http.post('/api/things', { name: this.newThing, info: this.newThingInfo });
        else
          this.$http.post('/api/things', { name: this.newThing });
        this.newThing = '';
        this.newThingInfo = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('workApp')
  .controller('MainController', MainController);

})();
