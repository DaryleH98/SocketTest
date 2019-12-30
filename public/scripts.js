const socket = io('http://localhost:9000')
socket.on('messageFromServer', (dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit('dataToServer', {data: "Data from the Client!"})
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log("Form Submited!!")
    const newMessage = document.querySelector('#user-message').value
    console.log(newMessage)
    socket.emit('newMessageToServer', {text: newMessage})

})

socket.on('messageToClients', (msg)=>{
    console.log(msg)
    document.querySelector('#messages').innerHTML +=  `<li>${msg.text}</li>`
})
// socket.on('ping', ()=> {
//     console.log('Ping was received from the server ')
// })
// socket.on('pong', (latency)=>{
//     console.log(latency)
//     console.log("Pong was sent to the server.")
// })