"use strict";

const pool = require("../../../configs/db");

function relationModal(query, data) {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, data, (error, results) => {
        if (error) throw new Error({ messsage: error.message });

        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

function userModal(query, data) {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, data, (error, results) => {
        if (error) throw new Error({ messsage: error.message });

        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  userModal,
  relationModal
};
