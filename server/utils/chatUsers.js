const users = [];

const addUser = ({ user_id, name, roomId }) => {
  name = name.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();

  const user = { user_id, name, roomId };

  users.push(user);

  return { user };
};

const removeUser = (user_id) => {
  const index = users.findIndex((user) => {
    user.id === user_id;
  });

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (user_id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomId) =>
  users.filter((user) => user.roomId === roomId);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
