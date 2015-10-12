//var http = require('http');
//<meta charset="utf-8"/>

//socket.io setup
var io = require('socket.io').listen(3001);

io.sockets.on('connection', function(socket) {
  console.log('socket.io client connected');
  socket.on('disconnect', function() {
    console.log('socket.io client disconnected');
  });
});

console.log('socket.io server on port 3001');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

router.post('/jira/webhook', function (req, res) {
  console.log(req.body.issue.fields.summary);
  io.sockets.emit('ping',req.body);
});
app.use("/", router);


app.listen(3002, function(){
  console.log("app server on port 3002");
});