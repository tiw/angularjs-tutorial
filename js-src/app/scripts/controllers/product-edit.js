'use strict';

jsSrcApp.controller(
    'Product-EditCtrl',
    ['$scope', '$location', '$routeParams', 'product', 'flash',
    function($scope, $location, $routeParams, product, flash) {

    $scope.title = 'Add product';
    $scope.product = new product.Product;
    $scope.hasError = false;
    if ($routeParams.id) {
        var p = $scope.product;
        p.$get({id: $routeParams.id}, function(p) {
            $scope.title = 'Edit: ' + p.name;
        });
        p.$save();
    }
    var scope = $scope;

        $scope.ignoreError = function() {
        $scope.hasError = false;
    };
    $scope.save = function() {
        scope.hasError = false;
        var product = scope.product;
        if (product._id) {
            //update it
            product.$update({id: $routeParams.id}, function(product) {
                scope.title = 'Edit: ' + product.name;
                scope.product = product;
                //$location.path('/product/' + product.id);
            });
        } else {
            product.$save({id: $routeParams.id}, function(product, headers) {
                scope.title = 'Edit: ' + product.name;
                scope.product = product;
                flash.notify('the product ' + product.name + ' is successfuly saved');
                $location.path(headers('Location'));
            }, function(err) {
                if (err.status == 500) {
                    scope.hasError = true;
                }
            });
        }
    };
}
]);
