const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


users = []
connections = []
messages = []
router.get('/',ensureAuthenticated,(req,res)=>{
    var io = req.app.get('socketio');
    io.on('connection', function(socket){
        console.log(req.user.name)
        socket.removeAllListeners()
        socket.on('chat message', function(msg){
            io.emit('chat message', req.user.name+': '+msg);
            console.log(socket.id+': ' + msg);
          });
      });
    
    res.render('chat')

})



module.exports = router