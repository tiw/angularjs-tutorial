'use strict';

describe('Controller: Product-EditCtrl', function() {

  // load the controller's module
  beforeEach(module('jsSrcApp'));

  var Product-EditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    Product-EditCtrl = $controller('Product-EditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
