const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const server = require('http').createServer(router)
var io = require('socket.io').listen(server)


users = []
connections = []


router.get('/', ensureAuthenticated, (req, res) =>
  res.send('chat')
);

io.sockets.on('connection',(socket)=>{
    connections.push(socket)    
    console.log('Connection %s sockets connected', connections.length)

    socket.on('disconnect',(data)=>{
        connections.splice(connections.indexOf(socket),1)
        console.log('Disconnected %s sockets connected', connections.length)
    })
})

module.exports = router;