const SocketIO = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./chatUsers");
const { model } = require("../models/model");
const { GET_MESSAGES } = require("../constants");
// let interval;

function socketIO(server) {
  const io = SocketIO(server);
  io.on("connection", (socket) => {
    console.log("Made socket connection!");
    // if (interval) {
    //   clearInterval(interval);
    // }

    socket.on("join", async ({ name, room }, callback) => {
      // add user and return user = {name, room} and error

      // if there is an error return callback(error)
      socket.join(room);

      io.to(room).emit("roomData", {
        room: "user.room",
        users: "getUsersInRoom(user.room)"
      });
      const messages = await model(GET_MESSAGES, room);
      console.log(messages, room);
      socket.emit("loadMessages", messages);
      callback();
    });

    socket.on("sendMessage", (data, callback) => {
      console.log(data);

      const user = getUser(socket.id);
      asd;

      // io.to(user.room).emit("message", {user: user.name, text: message});

      callback();
    });

    // interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on("disconnect", () => {
      // const user = removeUser(socket.id);

      // if(user) {
      //  io.to(user.room).emit("message", {user: "", text: `${user.name} has left`});
      //  io.to(user.room).emit("roomData", {user: "", users: getUsersInRoom(user.room)});
      // };

      console.log("Client disconnected");
      // clearInterval(interval);
    });
  });
}
function getApiAndEmit(socket) {
  const response = new Date();

  socket.emit("FromAPI", response);
}

module.exports = socketIO;
