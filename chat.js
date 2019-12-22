const express = require('express')
const socketio = require('socket.io')
const app = express()

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 9000
const expressServer = app.listen(port, () => console.log(`Listening on port ${port}`))
const io = socketio(expressServer, {
    path: '/socket.io',
    serveClient: true,
    wsEngine: 'ws'
})
io.on('connection', (socket)=>{
    socket.emit('messageFromServer', {data:'Welcome to the socketio server'})
    socket.on('messageToServer', (dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer', (msg) =>{
       console.log(msg) 
       io.emit('messageToClients', {text:msg.text})

    })
})