'use strict';

describe('Controller: AcceuilController', function() {

  // load the controller's module
  beforeEach(module('workApp'));
  beforeEach(module('socketMock'));

  var scope;
  var AcceuilController;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    AcceuilController = $controller('AcceuilController', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    $httpBackend.flush();
    expect(AcceuilController.awesomeThings.length).toBe(4);
  });
});
