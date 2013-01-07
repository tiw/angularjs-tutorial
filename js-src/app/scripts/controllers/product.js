'use strict';

jsSrcApp.controller('ProductCtrl', ['$scope', '$routeParams', 'product', function($scope, $routeParams, product) {
    var p = product.Product;
    console.log(p);
    $scope.product = p.get({id: $routeParams.id});
}]);
