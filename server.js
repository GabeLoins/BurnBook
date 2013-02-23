http = require("http");
url = require("url");

var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle[""] = requestHandlers.index;
handle["/"] = requestHandlers.index;
handle["/submit"] = requestHandlers.submit;
handle["/secretclear"] = requestHandlers.clear;

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " recieved.");
    route(handle, pathname, response, request);
  }
  http.createServer(onRequest).listen(8080);
  console.log("Server has started.");
}

start(router.route, handle);

/*
function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log(pathname);
    response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<div style='color:#" + Math.floor(Math.random()*16777215).toString(16) + "'>" + pathname + "<div>");
  response.end();
}

http.createServer(onRequest).listen(8080);
*/