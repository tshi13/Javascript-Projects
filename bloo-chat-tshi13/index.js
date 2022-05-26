const debug = require("debug")("bloo-chat");
const nunjucks = require("nunjucks");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const db = require("./data/db");
const UserDao = require("./data/UserDao");
const {verifyPassword} = require("./util/hashing")

const router = express.Router();
const users = new UserDao();
const online_users = new Set(); //set of all online users

const port = process.env.PORT || 7000;
db.connect(); 


nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("assets"));
app.use(express.urlencoded());


app.get("/", (req, res) => {  //go to homepage
  res.render("index.njk", null);
});

app.post("/register", async(req, res) => { //register new account
  
  const { uname, password} = req.body ; 
  if (!uname || !password) { //if user did not enter username or password
    return res.status(400).json({   
      message: "You must provide both username and password.",
    });
  }
    try { 
      const data = await users.create({ uname, password}); //create new uname and password in backend 
      res.status(201).render("index.njk", null);
    } catch (err) { //catch error when username has been taken
      return res.status(err.status).json({   
        message: "username already exists",
      });
    }
})


app.post("/chatroom", (req, res) => { //go into chatroom
//authorization
const { uname, password } = req.body;
  if (!uname || !password) {
    return res.status(400).json({   
      message: "You must provide both username and password.",
    });
  }
  try {
    (async () => {
      const user = await users.readOne(uname);

      // Authentication!
      const isAuthenticated = await verifyPassword( //verify username and password combination
        password,
        user ? user.password : ""
      );
      if (!isAuthenticated) { //if incorrect, re-render login page
        res.status(403).render("index.njk", null);
      } else { //if correct, render chatroom
        res.render("chatroom.njk", { uname: req.body.uname });
      }
    })();
    
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });}
});

io.on("connection", function (socket) { //when connected
  let user_name;
  let text;

  socket.on("join", (msg) => { //when server receives join message from client
    user_name = msg.user; //store username

    socket.emit("message", { //Welcome message to user
      user: user_name,
      message: "Welcome " + user_name + "!",
      type: "green",
    });
    
    if (online_users.size === 0) { //check if there are no users
      text = "Unfortunately no one is online at the moment 😔";
    } else { //show how many online users there are currently
      text = "Online users: ";
      online_users.forEach (function(value) {
      text += value;
      text += ", "
      })
      text = text.substring(0,text.length - 2);
    }
    
    socket.emit("message", { //send message to user telling how many active users there are
      user:user_name,
      message: text,
      type: "green"
    });

    online_users.add(user_name); //add user to set

    socket.broadcast.emit("message", { //tell everyone else that user joined room
      user: user_name,
      message: user_name + " joined the room!",
      type: "green",
    });
  });
  
  socket.on("message", (msg) => { //send user message to everyone
    io.emit("message", msg);
  });

  socket.on("disconnect", (reason) => { //when user quits window
    socket.broadcast.emit("message", { //tell everyone user left
      user: user_name,
      message: user_name + " left the room!",
      type: "red",
    });

    online_users.delete(user_name); //remove user from set
  });
});

http.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
