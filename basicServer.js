/*
* Self-sustaining file. Run it in node, and it will display the pathname in a fun, exciting color!
* Shows listening for requests, reading pathnames, and writing html to the frontend
*/

http = require("http");
url = require("url");

function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log(pathname);
    response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<div style='color:#" + Math.floor(Math.random()*16777215).toString(16) + "'>" + pathname + "<div>");
	response.end();
}

http.createServer(onRequest).listen(8080);