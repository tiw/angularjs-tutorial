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
        //debugger;
          console.log(element);
            $(element).clickover({
                global: true,
                title: 'Are you sure?',
                content: "<div id='my-poppy' class='btn-toolbar'><button id='button-confirm-delete-cancel' data-dismiss='clickover' class='btn'>Cancel</button><button id='button-confirm-delete-ok' class='btn btn-danger' ng-click='destroy(v)'>Delete</button></div>"
            }).on('shown', function() {
                $compile($("#my-poppy").contents())(scope);
            });
        }
    }
});
