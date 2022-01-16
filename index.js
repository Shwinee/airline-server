var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));
var cors = require('cors');
app.use(cors());

console.log("im up");  //server onlinme :sun galles:

var socket = require('socket.io');

const io = require("socket.io")(server, {
    cors: {
      origin: "https://shwinee.github.io/airline/",
      methods: ["GET", "POST"]
    }
});
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new player: '+socket.id);

  socket.on('sendPos', playerPos);

  function playerPos(data){
    socket.broadcast.emit('getPos', data);
  }
}
