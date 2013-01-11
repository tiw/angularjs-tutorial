'use strict';

var jsSrcApp = angular.module('jsSrcApp', ['ngResource', '$strap', 'ui'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/products/:id', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
      })
      .when('/product-edit/:id', {
        templateUrl: 'views/product-edit.html',
        controller: 'Product-EditCtrl'
      })
      .when('/product-edit', {
        templateUrl: 'views/product-edit.html',
        controller: 'Product-EditCtrl'
      })
      .when('/product-edit/:id', {
        templateUrl: 'views/product-edit.html',
        controller: 'Product-EditCtrl'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
