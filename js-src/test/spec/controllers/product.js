'use strict';

describe('Controller: ProductCtrl', function() {

  // load the controller's module
  beforeEach(module('jsSrcApp'));

  var ProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ProductCtrl = $controller('ProductCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
