
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

// called when the server requests "/" or ""
// displays the list of burns as well as a button to add some fresh hate!
function index(response, request) {
	console.log("Request handler 'index' was called");
	// reads the index.html file and prints it out
	response.writeHead(200, {'Content-Type': "text/html"});
	response.write("Burn Book<br>");
	fs.readFile("./rapsheet.txt", function(err, data){
		if(err) throw err;
		var splitData = data.toString().split("***");
		var dataHTML = "";
		for(var j = 0; j < splitData.length; j++){
			if(splitData[j].length == 0){
				dataHTML += "<br>";
			} else {
				dataHTML += splitData[j].split("**")[0] + ": " + splitData[j].split("**")[1] + "<br>";
			}
		}
		response.write(dataHTML);
		response.write("<form action='./submit' method='post'> <input type='text' name='name' value='name'>   <input type='text' name='crime' value='crime'>   <input type='submit' value='ADD'></form>");
		response.end();
	});
}

// called when the user has added a new burn to the book
function submit(response, request) {
	console.log("Request handler 'submit' was called");
	if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var POST = querystring.parse(body);
            var name = POST["name"];
			var crime = POST["crime"];
			fs.appendFile('rapsheet.txt', name + "**" + crime + "***", function (err) {
			  if (err) throw err;
			  console.log('successful addition!');
			  response.writeHead(302, {'Location': './'});
			  response.end();
			});
        });
    }
}

// called when the user wants to clear their database of burns, to hide it from the (police?)
function clear(response, request) {
	console.log("Request handler 'clear' was called");
	fs.writeFile('rapsheet.txt', '', function (err) {
	  if (err) throw err;
	  console.log('sheet cleared');
	  response.writeHead(302, {'Location': './'});
	  response.end();
	});
}

exports.index = index;
exports.submit = submit;
exports.clear = clear;