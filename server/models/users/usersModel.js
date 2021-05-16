"use strict";
const { pool } = require("../../../configs/db");
const ApiError = require("../../error/ApiError");

function modal(query, data) {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, data, (error, results) => {
        console.log(error);
        if (error) {
          throw ApiError.internal("A problem with the DB occured.");
        }

        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  modal
};
