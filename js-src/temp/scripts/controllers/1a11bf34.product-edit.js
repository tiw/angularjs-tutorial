'use strict';

jsSrcApp.controller('Product-EditCtrl', ['$scope', '$location', '$routeParams', 'product', function($scope, $location, $routeParams, product) {
    $scope.title = 'Add product';
    $scope.product = new product.Product;
    if ($routeParams.id) {
        var p = $scope.product;
        p.$get({id: $routeParams.id}, function(p) {
            $scope.title = 'Edit: ' + p.name;
        });

        p.$save();
        
    }
    var scope = $scope;
    $scope.save = function() {
        var product = scope.product;
        if (product.id) {
            //update it
            product.$update({id: $routeParams.id}, function(product) {
                scope.title = 'Edit: ' + product.name;
                scope.product = product;
                //$location.path('/product/' + product.id);
            });
        } else {
            product.$save({id: $routeParams.id}, function(product) {
                scope.title = 'Edit: ' + product.name;
                scope.product = product;
                console.log('/product/' + product.id);
                //$location.path('/product/' + product.id);
            });
        }
    };
}
]);
