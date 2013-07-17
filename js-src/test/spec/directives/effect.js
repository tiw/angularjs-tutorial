'use strict';

describe('Directive: effect', function() {
  beforeEach(module('jsSrcApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<effect></effect>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the effect directive');
  }));
});
