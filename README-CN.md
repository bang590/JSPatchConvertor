#JSPatch Convertor

JSPatch Convertor 可以自动把 Objective-C 代码转为 JSPatch 脚本。( [什么是 JSPatch ?](https://github.com/bang590/JSPatch) )

##使用

在线使用： [http://bang590.github.io/JSPatchConvertor](http://bang590.github.io/JSPatchConvertor)

请使用 Chrome 或 Safari 浏览器。

##功能

JSPatch Convertor 实现了 Objective-C 以下语法特性的转换：

####方法定义
```objc
- (void)requestUrl:(NSString *)url param:(NSDictionary *)dict {}
```

```js
requestUrl_param: function(url, dict) {}
```

####方法调用
```objc
[[JPRequest alloc] initWithUrl:url param:dict];
```
```js
JPRequest.alloc().initWithUrl_param(url, dict);
```

####Block 语法
```objc
[JPRquest handleCallback:^(id data, NSError *err) {}];
```
```js
JPRquest.handleCallback(block('id,NSError*', function(data, err) {}));
```


####变量声明
```objc
NSString *str = @"content";
```
```js
var str = "content";
```

####Getting/Setting Property
```objc
self.handler.successBlock(data);
self.handler.data = [[JPData alloc] init];
```
```js
self.handler().successBlock()(data);
self.handler().setData(JPData.alloc().init());
```

####NSString / NSArray / nil ...
```objc
NSDictionary *dict = nil;
dict = @{
     @"arr": @[@(1), @"2"]
};
```
```js
var dict = null;
dict = {
    "arr": [(1), "2"]
};
```


#限制

JSPatch Convertor 没有处理以下 Objective-C 语法特性的转换，若要转换的代码里有这些特性，会原样输出到转换后的 JSPatch 脚本上，需要人工再进行处理：

- 宏 / 静态变量 / 枚举
- C 函数调用
- GCD
- Struct
- C指针操作
- Get/Set 私有成员变量

