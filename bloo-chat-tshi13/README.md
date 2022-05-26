[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7666836&assignment_repo_type=AssignmentRepo)
# Homework 5: Bloo Chat!

A simple realtime messaging application build with Node, Express, and Socket.io.

After cloning the application, run `npm install` to install the dependencies. 

To run the application, use the command `npm run dev`.

Detailed instructions are at this [url](https://cs280spring.github.io/hw/hw5/index.html).

The application is deployed on [Heroku](https://bloochat-tshi13.herokuapp.com/).


[MONGODB is cleared by default]

[HOW THE APP WORKS]

The app has 2 page views: the login/register page, and the chatroom page.
The UI is controlled by index.njk and chatroom.njk, which all inherit parent.njk.

To successfully send a message, we have 2 core files: index.js and script.js.
script.js belongs to the "client side" while index.js belongs to the "server side".
To allow multiple users to communicate with each other, we rely on the implementation 
of web sockets. We use socket.io in this case. This allows us to send and receive information
between the client and server side.

To store important user information, we use MongoDB as our backend database, which stores usernames
and passwords. For security, passwords are salted and hashed. 

When a new user wants to register a new account, they fill in the information, and then click the 
register button. This triggers the /register action, which then goes to index.js, where we check the 
username and password, before calling the create() function which stores the information in the database.
Once successful, the user can then fill in the information and click on the login button. This time, it 
triggers the /chatroom action, also in index.js. Here, we check the validity of the username and password,
using verifyPassword(), which is in hashing.js. If successful, we render chatroom.njk, which allows the user
to enter the chatroom and chat with friends. Otherwise, we will re-render index.njk, and the user will re-enter
the username and password. 

ApiError.js contains all the functions needed for hashing/salting passwords
db.js  and User.js contains functions that allow us to setup MongoDB successfully
UserDao.js contains functions that allow us to interact with the backend database
ApiError.js contains functions that help us throw errors when making API calls


