# hotreload

This is Hot reload

## Setup

    $ npm install hotreload

## About

Read test/example.js

```js
var hotreload = require("../hotreload.js");

(function _Exec(){
  setTimeout(_Exec, 1000);
  
  var no1;
  
  hotreload("./server.d/no1.js", function(err, module){
    if (!!err) { return; }
    no1 = module || null;
  });
  
  if (!!no1) {
    no1();
  }
})();
```