'use strict';

jsSrcApp.controller('MainCtrl', ['$scope', 'product', function($scope, product) {
  $scope.products = product.Product.query();

  $scope.product = new product.Product;
  console.log('ini confirm delete to false');
  $scope.confirmDelete = false;
  $scope.delete = function(id) {
      var product = $scope.product;
      console.log($scope.confirmDelete);
      if ($scope.confirmDelete) {
          console.log('try to delete product');
          product.$delete({id: id}, function(product) {
              var index = $scope.products.indexOf(product);
              for (var i = 0; i < $scope.products.length; i++) {
                  if (id == $scope.products[i]._id) {
                      $scope.products.splice(i, 1);
                  }
              }
              //$scope.confirmDelete = false;
              //console.log($scope.products);
          });
      } else {
          $scope.confirmDelete = true;
      }
  };
}]);
