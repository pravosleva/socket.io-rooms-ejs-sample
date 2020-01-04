const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if (messageForm != null) {
  let name = getCookie("name");
  if (name == "") {
    name = prompt("What is your name?");
    if (name != "" && name != null) {
      setCookie("name", name, 365);
    }
  }

  appendMessage("You joined");
  socket.emit("new-user", roomName, name);

  messageForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    if(message != "") {
    appendMessage(`You: ${message}`, "You");
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
    }
  });
}

socket.on("room-created", room => {
  const roomElement = document.createElement("div");
  roomElement.innerText = room;
  const roomLink = document.createElement("a");
  roomLink.href = `/${room}`;
  roomLink.innerText = "join";
  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
});

socket.on("chat-message", data => {
  appendMessage(`${data.name}: ${data.message}`, "Else");
});

socket.on("user-connected", name => {
  appendMessage(`${name}`, "Status");
});

socket.on("user-disconnected", name => {
  appendMessage(`${name} left`, "Status");
});

function appendMessage(message, sender) {
  const messageElement = document.createElement("div");
  if(sender == "You"){
    messageElement.classList.add('animated', 'fadeInRight', 'faster', 'fromYou');
  } else if(sender == "Status"){
    messageElement.classList.add('animated', 'fadeInLeft', 'faster', 'statusMsg');
  } else {
    messageElement.classList.add('animated', 'fadeInLeft', 'faster', 'fromElse');
  }
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
