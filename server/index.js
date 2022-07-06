const io = require('socket.io')(8000)       //To use the Socket.io module on port 4400

const user = {};    //Creating user related data

//creating a response of server whenever a connection is made by the user
io.on('connection', socket => {     
    //response of a new user joining the server
    socket.on('new-user-joined', username => {  
        user[socket.id] = username;
        //everyone except the user
        socket.broadcast.emit('user-joined', username);
    });

    //reponse of sending a message
    socket.on('send', message => {
        socket.broadcast.emit('recieve', {message: message, username: user[socket.id]});
    });
    
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    });
})