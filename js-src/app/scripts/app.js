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
  }]).factory('flash', function($rootScope) {
    return {
        notify: function(message) {
            $rootScope.$emit('event:notification', message);
        }
    };
  }).directive('notice', function($rootScope) {
      return {
          restrict: 'EA',
          replace: false,
          transclude: false,
          link: function(scope, element, attr) {
              $rootScope.$on('event:notification', function(event, message) {
                  console.log(element);
                  alert(message);
                  element.html(message);
                  element.show();
                  console.log('get notification' + message);
              });
          }
      }
  });
