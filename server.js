const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const http = require("http");
const app = express()
const {encryption} = require("./client/src/encryption/encrypt")

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "https://gigachatfront.onrender.com",
        methods: ["GET", "POST"]
    }
})

const PORT = process.env.PORT || 5000

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({recipients, text}) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text: encryption(text, "aboba")
            })
        })
    })
})

server.listen(PORT, () => console.log('Server is started on port ' + PORT))