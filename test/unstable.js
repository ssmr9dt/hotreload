
var fs = require("fs");
var path = require("path");

module.exports = function(filename, callback){
	var domain = require("domain").create();
	var fullpath = path.resolve(process.cwd(),filename);
	
	domain.on("error", function(e){
		require.cache[fullpath].m = null;
		callback(e, null);
	});

	domain.run(function(){
		if (!!require.cache[fullpath]) {
			if (!!require.cache[fullpath].m) {
				return;
			}
		}
		
		fs.watch(filename, domain.bind(function(event,filename){
			var m = (new Date()).getTime()/1000;
			if (!!filename) {
				delete(require.cache[fullpath]);
				if (event === "change") {
					var module = require(fullpath);
					require.cache[fullpath].m = m;
					callback(null,module);
				} else {
					callback(null,null);
				}
			}
		}));
		
		fs.stat(filename, domain.bind(function(err, stats){
			var m = (new Date(stats.mtime)).getTime()/1000;
			var cc= require.cache[fullpath];

			if (!!!cc || !!!cc.m || m > cc.m) {
				delete(require.cache[fullpath]);
				var module = require(fullpath);
				require.cache[fullpath].m = m;
				callback(null,module);
			}
		}));
	});
};
