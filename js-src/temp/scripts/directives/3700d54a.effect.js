'use strict';

jsSrcApp.directive('fadey', function() {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
        var duration = parseInt(attrs.fadey);
        if (isNaN(duration)) {
            duration = 500;
        }
        elm = jQuery(elm);
        elm.slideDown(duration, function() {
            elm.removeClass('ui-animate');
        });
    }
  };
});
