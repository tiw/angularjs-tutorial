# Form 表单

在开始看angularjs如何处理表单前， 我们先想想处理表单时可能遇到的问题

1. 如何数据绑定
1. 验证表单element e.g. input select etc
1. 显示出错信息
1. 整个Form的验证
1. 避免提交没有验证通过的表单
1. 如果防止多次提交

## form

如果我们引用了anuglajs， 在一个controller的scope下写了一个HTML的form，
其实我们已经在使用 angularjs 的 form directive 了。

下面两种html的写法都会调用 angularjs 的form directive, 并且可以用myForm引用这个
form， 来判断表单是否验证通过。

```html
<form name="myForm"></form>
<ng-form name="myForm"></ng-form>
```

### bind model 如何双向绑定

用 ng-model。 下面的代码把controler scope下的person的name和一个叫做 _personName_
input 绑定到了一起


```html
<form>
  <input name="personName" ng-model="person.name"/>
</form>

```

### valid field 验证表单element, 显示出错信息

 这里分两部分， 第一部分是angular自带的验证器， 另一部分是自己实现的验证器。
 这里只介绍第一种情况。 第二个会在单独的文章里描述。

 angularjs 自带了一些html5的验证， 比如： 必填项、email、url.

 Angular实现了html5常用的input类型， 包括 (text, number, url, email, radio, checkbox)
 同时实现了下面的directive做验证(required, pattern, minlength, maxlength, min, max).

 用法一如既往的简单， 都是声明式的. 下面我们定义了一个input，名字叫做 personEmail，
 要求必须有输入，而且输入的必须是一个email. 通过变量
 ```js
    myForm.personEmail.$valid
 ```
 我们可以判定这个input的输入是否合法， 从而决定是否显示出错信息。

 具体是那类错误可以通过
 ```js
    myForm.personEmail.$error
 ```
 用法如下：
 


```html
<form name="myForm">
  <input name="personEmail" required type="email" ng-model="person.email"/>
  <span ng-show="!myForm.personEmail.$valid">有错</span>
  <span ng-show="myForm.personEmail.$error.required">必填</span>
  <span ng-show="myform.personEmail.$error.email">email 地址不对</span>
</form>
```

### form是否通


```js
form.$invalid
```

用这个值可以控制提交按键的状态， 值允许valid的form可以提交.

```html
<form name="myForm" ng-submit="save()">
  <input name="personEmail" required type="email" ng-model="person.email"/>
  <span ng-show="!myForm.personEmail.$valid">有错</span>
  <span ng-show="myForm.personEmail.$error.required">必填</span>
  <span ng-show="myform.personEmail.$error.email">email 地址不对</span>
  <input name="personName" required/>

  <input type="submit" ng-disabled="myForm.$invalid"/>
</form>

```

提交的方法， 我们通过ng-submit 绑定到了controller里的save函数上。


form的简单使用就是这样了

*注意*

在至少1.0.7下， input form的名字要用驼峰， 否者有问题。

## demo

[demo](http://plnkr.co/wWi2nmAZuss3AAoSQsyN)
