# form 进阶

## css 样式

对于表单在不同状态下， 我们可能希望它有不同的样式。举个具体的例子，我们希望表单
中名字这项是必填的， 如果没填就显示黄色背景， 提示用户。 这里有个问题， 就是当
表单首次显示的时候， 及时这个时候名字这项是空的， 我们也不希望显示黄色背景。

ng form 会给根据具体情况给表单里的每项自动添加下列 css class：

1. ng-valid: 验证通过
1. ng-invalid: 验证没有通过 
1. ng-pristine: 用户没有输入任何东西
1. ng-dirty: 用户输入了东西， 不管最终值有木有改变。 例如开始里面是空的，
    填写了ab， 之后又吧ab删除了， 这是也是dirty的.


通过这个类我们可以实现我们上面想要的效果

```html
<form name="myForm" ng-submit="save()">
  <input type="text" name="personName" ng-model="person.name" required>
  <input type="submit" value="保存"/>
</form>
<style type="text/css">
  input.ng-invalid.ng-dirty {
    background-color: yellow;
  }
</style>
```

[demo](http://plnkr.co/8D8BNILDPHQ4XKODBYbe)

## customer validation 自定义的验证

form入门里我们已经了解到了， angularjs实现了常用的一些表单验证。

* required
* pattern 
* minlength
* maxlength
* min
* max

现实中可能需要自定义的一些验证器， 比如在管理scrum story point的时候， 故事点数只
能是 1， 2， 3， 5， 8， 13， 20， 40， 80。 下面我们实现并且使用我们自己定义的
directive

```js
angular.module('myApp')
.directive('spoint', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var fibonacci = [1, 2, 3, 5, 8, 13, 20, 40, 80];
      ctrl.$parsers.unshift(function(viewValue) {
        if (fibonacci.indexOf(parseInt(viewValue)) >= 0) {
          ctrl.$setValidity('fibonacci', true);
          return viewValue;
        } else {
          ctrl.$setValidity('fibonacci', false);
          return undefined;
        }
      });
    }
  };
});

```

这里值得注意的是directive里link方法的第四个参数，我们在require里定义了ngModel
所以这里它是一个 NgModelController 
http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController。

NgModelController是用来为ng-model提供了一组API。通过他我们可以他来确定ngModel的
值是否是合法的。 我们这里只介绍其中和表单验证有关的几个方法和属性。

上面的例子中我们用到了$parsers这个属性和$setValidity()这个方法。
$parsers里保存了一组function， 每当DOM里数据变化的时候， 这组function会被一次掉
用。这里给了我们机会在用户修改了DOM里值的时候， 去对新输入的值做校验。
具体的校验就是

```js

        if (fibonacci.indexOf(parseInt(viewValue)) >= 0) {
          ctrl.$setValidity('fibonacci', true);
          return viewValue;
        } else {
          ctrl.$setValidity('fibonacci', false);
          return undefined;
        }
```

标记一个model的值是否合法是通过方法 $setValidity 实现的。 这个方法有两个参数，
第一个是验证器的名字， 这里我们起名叫fibonacci。 这个名字会被使用显示对于的出错信息
就像我们在入门篇里用到的 

```js
    myForm.personEmail.$error.required
    myForm.personEmail.$error.email
```

里面的email 或是required。

第二个参数是个boole， 就是用来标记是否合法的。
return的值会传递给下一个 $parsers 里的function， 返回undefined的话会终止继续传递。

[demo](http://plnkr.co/xYblQDCJ0cL7liZG6PW3)

