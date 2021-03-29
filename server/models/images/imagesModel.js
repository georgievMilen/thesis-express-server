"use strict";

const pool = require("../../../configs/db");

function insertImageDB(imageData) {
  const query = "INSERT INTO user_photo SET ?";
  return new Promise((resolve, reject) => {
    pool.query(query, imageData, (err) => {
      try {
        if (err) throw err;

        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  });
}

function getImageDB(userAccountId) {
  const query =
    "SELECT * FROM user_photo WHERE user_account_id = ? AND active = 1";
  return new Promise((resolve, reject) => {
    pool.query(query, userAccountId, (err, results) => {
      try {
        if (err) throw err;
        if (!results[0]) return resolve(false);
        return resolve(results);
      } catch (err) {
        return reject(err);
      }
    });
  });
}

function updateImageIsActiveDB(userAccountId, active) {
  const query = "UPDATE user_photo SET active =  ? WHERE user_account_id = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [active, userAccountId], (err, results) => {
      console.log({ results, err });
      if (err) reject(err);
      return resolve(true);
    });
  });
}

module.exports = {
  updateImageIsActiveDB,
  insertImageDB,
  getImageDB
};
