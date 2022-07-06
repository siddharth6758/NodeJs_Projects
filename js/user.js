const socket = io('http://localhost:8000');

const input = document.getElementById('send-container');
const msgInp = document.getElementById('msgInp');
const msgBox = document.querySelector('.container');
var msg = new Audio('message.mp3');
var join = new Audio('userjoin.wav');

const append = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); 
    messageElement.classList.add(position);
    msgBox.append(messageElement);
    if(position == 'left'){
        msg.play();
    }
}

const userJoin = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); 
    messageElement.classList.add(position);
    msgBox.append(messageElement);
    if(position == 'right'){
        join.play();
    }
}

input.addEventListener('submit', (a)=>{
    a.preventDefault();
    const m = msgInp.value;
    append(`You: ${m}`, 'right');
    socket.emit('send', m);
    msgInp.value = '';
})

const userName = prompt("Enter Username to join: ");
socket.emit('new-user-joined', userName);

socket.on('user-joined', name=>{
    userJoin(`${name} joined the chat!`,'right')
})
socket.on('recieve', data=>{
    append(`${data.username}: ${data.message}`,'left');
})
socket.on('left', name=>{
    append(`${name} left the chat`,'left');
})