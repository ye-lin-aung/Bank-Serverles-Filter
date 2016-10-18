var jmespath = require('jmespath');
var http = require("http");
module.exports = function (context,cb) {
	var bank = context.query.bank+"";
	var cy = context.query.cy+"";
	var data = bank.trim();
	var options = {
		host: 'c.yelinaung.com',
		path: "/api/v1/b/"+data
	};
		console.log(options);		
		var data = http.request(options, function(response){
			var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//          //the whole response has been recieved, so we just print it out here
		response.on('end', function () {
		var json = JSON.parse(str);
		var b = jmespath.search(json, "data.currencies[].rates[]."+cy);

		cb(null,b);
		
	});



}).end();

}


