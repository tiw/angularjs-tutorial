'use strict';

jsSrcApp.factory('product', ['$resource', function($resource) {
    var Product = $resource('/product/:id', {id: '@id'}, {
        update: { method : 'PUT' }
    });
    return {
        Product: Product
    };
}]);
