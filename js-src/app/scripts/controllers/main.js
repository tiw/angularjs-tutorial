'use strict';

jsSrcApp.controller('MainCtrl', ['$scope', 'product', function($scope, product) {
  $scope.products = product.Product.query();

  $scope.product = new product.Product;
  var scope = $scope;

  $scope.delete = function(id) {
    var product = scope.product;

    console.log(product);

    product.$delete({id: id}, function(product) {
        console.log(product.title);
    });
  };
}]);
