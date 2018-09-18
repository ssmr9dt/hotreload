# hotreload

This is Hot reload

## Setup

    $ npm i ssmr9dt/hotreload

## About

Read test/example.js

```js
var hotreload = require("@ssmr9dt/hotreload");

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