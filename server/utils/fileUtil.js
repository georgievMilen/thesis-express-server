const fs = require("fs-extra");
const { func } = require("joi");

function readDir(destination) {
  return new Promise((resolve, reject) => {
    fs.readdir(destination, (err, data) => {
      if (err) return reject(err);

      if (data.length === 0) return resolve(null);

      resolve(data);
    });
  });
}

module.exports = { readDir };
