#JSPatch Convertor

JSPatch Convertor is a tool that converts Objective-C code to JSPatch script automatically.   
( [What's JSPatch?](https://github.com/bang590/JSPatch) )

##Usage

Check out [http://bang590.github.io/JSPatchConvertor](http://bang590.github.io/JSPatchConvertor)

Please use Chrome or Safari.

#####Advice: You can also download Mac Application:

Click: https://github.com/DevSonw/JSPatchConvertor/blob/gh-pages/JSPatchConvertor.zip

##Supported

The Objective-C syntax below is supported to convert：

####Method declaration
```objc
- (void)requestUrl:(NSString *)url param:(NSDictionary *)dict {}
```
```js
requestUrl_param: function(url, dict) {}
```

####Method calling
```objc
[[JPRequest alloc] initWithUrl:url param:dict];
```
```js
JPRequest.alloc().initWithUrl_param(url, dict);
```

####Block syntax
```objc
[JPRquest handleCallback:^(id data, NSError *err) {}];
```
```js
JPRquest.handleCallback(block('id,NSError*', function(data, err) {}));
```


####Variable declaration
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

#Unsupported

JSPatch Convertor didn't support the Objective-C / C syntax below, you should modify it manually after converted:

- Macro / constant variable / Enum
- C function calling
- GCD functions
- Pointer / Struct
- Getting / Setting private variable
