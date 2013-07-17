# Decorator

装饰， 在已有的功能上锦上添花

## Use case 使用场景：

我有一个module A依赖于另外一个module B。 module B有个service Mail， 这个服务提供
两个方法 setReceiver 和 setBody 分别用来指定邮件的收件人和邮件的内容。 但是在
module A 使用Mail服务的时候， 我希望还可以指定抄送的人。 这个时候我就可以在已有
的service上扩展下（装饰下）加个addCC的方法。

## Example

### Module A

```js
var Mail = function() {
    this.receiver = '';
    this.body = '';
    this.cc = [];
};

Mail.prototype.setReceiver = function(receiver) {
    this.receiver = receiver;
};

Mail.prototype.setBody = function(body) {
    this.body = body;
};

angular.module('A', []).service('Mail', Mail);
```

### Module B
```js
angular.module('B', ['A']).config(function($provide) {
    $provide.decorator('Mail', function($delegate) {
        $delegate.addCC = function(cc) {
            this.cc.push(cc);
        };
        return $delegate;
    });
})
.controller('TestCtrl', function($scope, Mail) {
    Mail.addCC('jack');
    console.log(Mail);
});
```
[demo](http://plnkr.co/C5lWho67ORU7rhRNHO5F)
