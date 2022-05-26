
document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  const socket = io(); // automatically tries to connect on same port app was served from
  const username = document.getElementById("uname").innerText;
  const form = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");

  socket.emit("join", { //tell server user has joined
    user: username,
  });


  form.addEventListener("submit", (event) => { //when user wants to send message, send to server
    socket.emit("message", {
      user: username,
      message: messageToSend.value,
      type: "white",
    });
    messageToSend.value = "";
    event.preventDefault();
  });

  // append the chat text message
  socket.on("message", (msg) => {
    const message = document.createElement("span"); //message part of each line
    const user = document.createElement("span"); //user bubble part of each line
    const line = document.createElement("li"); //one line

    if (msg.type === "green") { //green colored messages
      user.textContent = "BlooChatApp";
      user.className = "username";
      message.textContent = msg.message;
      line.appendChild(user);
      line.appendChild(message);
      line.style.color = "#86f7a4";
    } else if (msg.type === "white") { //white messages
      user.textContent = msg.user;
      user.className = "username";
      message.textContent = msg.message;
      message.style.color = "white";
      line.appendChild(user);
      line.appendChild(message);
    } else {                          //red messages
      user.textContent = "BlooChatApp";
      user.className = "username";
      message.textContent = msg.message;
      line.appendChild(user);
      line.appendChild(message);
      line.style.color = "#f79cc5";
    }

    if (msg.message.length != 0) { //add message to messages!
      messages.appendChild(line);
    }
    messages.scrollTop = messages.scrollHeight;
  });
});



