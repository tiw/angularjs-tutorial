# Sharing Data between Controller

在controller间分享数据

## Blood 血腥的方法

每个controller都有自己的scope， 同时也可以共享他们老爸的scope内的数据。如果我们想让两个controller共享数据的化， 有多种方法。 最直接血腥的就是在他们老爸的scope里定义一个model。

```html
<input type="text" ng-model="person.name"/>
  <div ng-controller="FirstCtrl">
  {{person.name}}
  <button ng-click="setName()">set name to jack</button>
  </div>
  <div ng-controller="SecondCtrl">
  {{person.name}}
  <button ng-click="setName()">set name to jack</button>
  </div>
</div>
```

需要注意的是， 必须定义一个对象， 并且在每个controller里都是修改这个对象的属性。比如在FirstController里的setName 里修改name： person.name = 'Jack' ， 如果你在setName里 person = {name: 'Jack'} 呵呵， 效果大家自己试试， 原因是js的prototype的特性。


这个方法血腥的原因是所有共享的数据都要在上级定义， 如果子controller多了， 共享数据是指数级上升的， 如此老爸的负担会超大。那些controller共享了那些数据会很模糊。而且测试非常空难。最后一条对于不正经的js开发人员， 估计不是什么问题。

## Elegant 优雅的方法

什么才不是血腥的呢？angularjs最突出的特殊之一就是DI， 也就是注入， 利用factory把需要共享的数据注入给需要的controller可以干净漂亮的解决这个问题。

``` js
var myApp = angular.module("myApp", []);
myApp.factory('Data', function() {
  return {
    name: "Ting"
  }
});
myApp.controller('FirstCtrl', function($scope, Data) {
  $scope.data = Data;

  $scope.setName = function() {
    Data.name = "Jack";
  }
});

myApp.controller('SecondCtrl', function($scope, Data) {
  $scope.data = Data;
  
  $scope.setName = function() {
    Data.name = "Moby";
  }
});
```

ok
就是这么简单， 自己试试之后再感谢我吧

demo： [http://plnkr.co/edit/6cLn0LXTu16AwJeiCqtn?p=preview][1]


  [1]: http://plnkr.co/edit/6cLn0LXTu16AwJeiCqtn?p=preview
