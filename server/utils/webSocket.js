const SocketIO = require("socket.io");
let interval;

function socketIO(server) {
  const io = SocketIO(server);
  io.on("connection", (socket) => {
    console.log("Made socket connection!");
    if (interval) {
      clearInterval(interval);
    }

    socket.on("join", ({ roomID }) => {
      socket.join(roomID);
    });
    socket.emit("loadMessages", [
      { user: "milen", text: "text from milen" },
      { user: "person", text: "this is the secont message" }
    ]);

    socket.on("sendMessage", (data) => {
      console.log(data);
    });

    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
}
function getApiAndEmit(socket) {
  const response = new Date();

  socket.emit("FromAPI", response);
}

module.exports = socketIO;
