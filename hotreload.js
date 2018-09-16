
var fs = require("fs");
var path = require("path");

module.exports = function(file, callback){
	var domain = require("domain").create();
	domain.on("error", function(e){
		require.cache[path.resolve(process.cwd(),file)].m = null;
		callback(e, null);
	});

	domain.run(function(){
		fs.stat(file, domain.bind(function(err, stats){
			var m = (new Date(stats.mtime)).getTime()/1000;
			var cc= require.cache[path.resolve(process.cwd(),file)];

			if (!!!cc || !!!cc.m || m > cc.m) {
				delete(require.cache[path.resolve(process.cwd(),file)]);
				var module = require(path.resolve(process.cwd(),file));
				require.cache[path.resolve(process.cwd(),file)].m = m;
				callback(null,module);
			}
		}));
	});
};
