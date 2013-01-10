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
}).directive('buttonDelete', function($compile, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        template: '<a class="button-delete"><i style="margin-top: 4px;" class="icon-remove"></i></a>',
        link: function(scope, element, attrs) {
            var ename = attrs.ename;
            $(element).clickover({
                global: true,
                title: 'Are you sure?',
                //auto_close: 5 * 1000,
                html: true,
                content: "<div id='my-poppy' class='btn-toolbar'>" +
                         "<button data-dismiss='clickover' class='btn'>Cancel</button>" +
                         "<button data-dismiss='clickover' class='btn btn-danger' ng-click='destroy(" + ename + ")'>Delete</button>" +
                         "</div>"
            }).on('shown', function() {
                $compile($('#my-poppy').contents())(scope);
            });
        }
    };
});
