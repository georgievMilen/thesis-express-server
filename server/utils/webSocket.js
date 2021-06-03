const SocketIO = require("socket.io");

const { model } = require("../models/model");
const { GET_MESSAGES, GET_USER_DATA, POST_MESSAGE } = require("../constants");

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
      const mssgs = await model(GET_MESSAGES, room);

      callback({ mssgs: mssgs });
    });

    socket.on("sendMessage", async (data, callback) => {
      const { email, room, message } = data;
      const mssg = {};
      const user = await model(GET_USER_DATA, email);

      const m_data = [room, message, user[0].id];
      const mssg_data = await model(POST_MESSAGE, m_data);

      if (mssg_data.affectedRows > 0) {
        Object.assign(mssg, {
          message_id: mssg_data.insertId,
          email,
          first_name: user[0].first_name,
          last_name: user[0].last_name,
          text: message,
          user_id: user[0].id
        });
        io.to(room).emit("message", mssg);
      }
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
