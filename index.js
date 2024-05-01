const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;
const http = require('http').createServer(app);
const { Server } = require('socket.io');

app.use(cors());

// const io = new Server(http, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//     },
// });
const io = new Server(http);

app.get('/', (req, res) => {
    res.send('socket io running on Port : ${PORT}');
});

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('send_message', (msg) => {
        // console.log(msg);
        socket.broadcast.emit('receive_message', msg);
        console.log(socket.id, msg);
    });

    socket.on('send_id', (id) => {
        const {socket_id, input } = id;
        
        io.to(socket_id).emit('ngobrol_message', input);
        // console.log(id);
        // console.log(input);
    });
});

// http.listen(3001, () => {
//     console.log('listening on :3001');
// });

http.listen(PORT, () => {
    console.log(`listening on :${PORT}`);
});