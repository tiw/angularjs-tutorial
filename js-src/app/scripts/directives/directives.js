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
        restrict: 'A',
        replace: true,
        template: '<a class="button-delete"><i style="margin-top: 4px;" class="icon-remove"></i></a>',
        link: function(scope, element, attrs) {
            var ename = attrs.buttonDelete;
            var e = $(element);
            $(element).clickover({
                global: true,
                title: 'Are you sure?',
                auto_close: 5 * 1000,
                html: true,
                content: "<div class='poppy btn-toolbar'>" +
                         "<button data-dismiss='clickover' class='btn'>Cancel</button>" +
                         "<button data-dismiss='clickover' class='btn btn-danger' ng-click='destroy(" + ename + ")'>Delete</button>" +
                         "</div>"
            }).on('shown', function() {
                var poppy = $('.poppy', e.parent())[0];
                $compile($(poppy).contents())(scope);
            });
        }
    };
});
