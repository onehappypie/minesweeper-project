const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let bombAmount = 20
let width = 10

const bombsArray = Array(bombAmount).fill('bomb');
const emptyArray = Array(width*width - bombAmount).fill('valid');
const gameArray = emptyArray.concat(bombsArray);
const shuffledArrays = gameArray.sort(() => Math.random() -0.5);
//add Flag with right click


io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.broadcast.emit('message', `${socket.id.substr(0,2)} said ${message}` );
    });

    io.emit('board', shuffledArrays );

    socket.on('id', (i) =>  {
        console.log("I am at the server" + i)
    });

});

http.listen(8080, () => console.log('listening on http://localhost:8080') );