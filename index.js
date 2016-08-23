var http = require('http');
var dispatcher = require('httpdispatcher');
var clientHttp = require('client-http');
var yaml = require('js-yaml');

function convertYAML2JSON(data){
  try {
    returnVal = yaml.safeLoad(data, { schema: yaml.JSON_SCHEMA });
  }catch(exception){
      console.log(exception.reason)
      returnVal=  {error: exception}
  }
  return JSON.stringify(returnVal);
}


const PORT=process.env.PORT;

dispatcher.onGet("/", function(req, res) {
    if (! req.params.url) {
      res.writeHead(401, {'Content-Type': 'text/plain'})
      res.end("Required parameter url missing")
      return;
    }
    clientHttp.get(req.params.url, function(data, err){
      if( err){
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end(err);
      }
      res.end(convertYAML2JSON(data))
    })
});

//A sample POST request
dispatcher.onPost("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(convertYAML2JSON(req.body));
});


//Lets use our dispatcher
function handleRequest(request, response){
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    console.log("Server Started succefully");
});
