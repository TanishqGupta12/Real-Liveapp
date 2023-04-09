const socket = io()

let name= null;
let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')
do {
   name = prompt("Please Enter Your name")
} while (!name);

textarea.addEventListener('keyup' , (e)=>{
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
})


function sendMessage(msgs) {
    let msg = {
        user : name ,
        message : msgs.trim()
    }
    appendMessage(msg , 'outgoing')

    textarea.value = ''
    scrollTOBotton()

    // send t server 
    socket.emit('message',msg)
}


function appendMessage(msg ,  type) {

     let maindiv = document.createElement('div')
     let className = type
     maindiv.classList.add(className , "message")

     let markup =`
     <h4> ${msg.user}</h4>
     <p>${msg.message }</p>
     `
     maindiv.innerHTML = markup

     messageArea.appendChild(maindiv)
}


// recieve

socket.on('message' ,(msg) =>{
    console.log(msg);
    appendMessage(msg , 'incoming')
    scrollTOBotton()
})

function scrollTOBotton() {
    messageArea.scrollTop = messageArea.scrollHeight ;
}