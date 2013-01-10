'use strict';

jsSrcApp.controller('MainCtrl', ['$scope', 'product', function($scope, product) {
    $scope.products = product.Product.query();

    $scope.product = new product.Product;
    $scope.destroy = function(e) {
        $scope.delete(e);
    };
    $scope.delete = function(id) {
        var product = $scope.product;
        product.$delete({id: id}, function(product) {
            var index = $scope.products.indexOf(product);
            for (var i = 0; i < $scope.products.length; i++) {
                if (id == $scope.products[i]._id) {
                    $scope.products.splice(i, 1);
                }
            }
        });
    };
}]);
