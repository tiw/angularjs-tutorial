# B 双向绑定


## What

什么是数据双向绑定

双向绑定的两个端点是js对象和dom对象。双向是说
1. js对象有改变的时候dom对象做相应的变化。 
例如我们一个person的name绑定到一个表单的input的value，当person的name变化后input的value也会改变。
2. 当dom改变的时候js对象也会改变
如上例中， input的value变化， 对应的person的名字也会改变。


## How

如何绑定

_index.html_

```html
<div ng-controller="TestCtrl">
  <form>
    <input ng-model="person.name"/>
  </form>
</div>
```

_controller.js_

```js
myApp.controller('TestCtrl', function($scope) {
  $scope.person = {
    name: "Moby"
  };
});
```

[live demo](http://plnkr.co/LWdgteUr0jSsZNVqWNWX)


### ng-model

数据和dom的双向绑定

### $scope

通过 $scope 把contrller内的数据暴露给view
