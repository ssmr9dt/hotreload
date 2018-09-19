var hotreload = require("../hotreload.js");

const no1_path = "./server.d/no1.js";

var no1 = require(no1_path);


// If you edit no1.js during execution, no1.js will be reloaded
// node exampleで実行した状態で、no1.jsを変更すると反映されます。

(function _Exec(){
  setTimeout(_Exec, 1000);
  
  hotreload(no1_path, function(err, module){
    no1 = module || null;
  });
  
  if (no1 && typeof(no1) === "function") {
    no1();
  }
})();