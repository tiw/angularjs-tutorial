'use strict';

describe('Controller: ProductsCtrl', function() {

  // load the controller's module
  beforeEach(module('jsSrcApp'));

  var ProductsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ProductsCtrl = $controller('ProductsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
