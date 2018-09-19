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
  
  hotreload(no1_path, function(err, module){
    no1 = module || null;
  });
  
  if (no1 && typeof(no1) === "function") {
    no1();
  }
})();
```