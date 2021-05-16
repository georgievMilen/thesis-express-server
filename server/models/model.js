"use strict";
const { pool } = require("../../configs/db");
const ApiError = require("../error/ApiError");

function model(query, data) {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, data, (error, results) => {
        if (error) {
          console.log(error);
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
  model
};
