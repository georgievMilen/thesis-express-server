"use strict";

const socketIO = require("./utils/webSocket");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const pool = require("../configs/db");
const express = require("express");
const http = require("http");
const cors = require("cors");
const session = require("cookie-session");

module.exports = function () {
  let app = express(),
    create,
    start;

  const server = http.createServer(app);
  create = function (config) {
    let routes = require("./routes/indexRoute");

    // Server settings
    app.set("env", config.env);
    app.set("port", config.port);
    app.set("hostname", config.hostname);

    // Returns middleware that parses json
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
      session({
        name: "session",
        secret: "secterKey",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })
    );
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("uploads"));
    app.use(function (req, res, next) {
      res.header("Content-Type", "application/json;charset=UTF-8");
      res.header("Access-Control-Allow-Credentials", true);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    // Enable cors
    app.use(
      cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
    );
    routes.init(app);
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(400).send(err);
    });
  };

  start = function () {
    let hostname = app.get("hostname");
    let port = app.get("port");

    server.listen(port, function () {
      console.log(
        "Express server listening on - http://" + hostname + ":" + port
      );
    });

    pool.getConnection(function (err, connection) {
      if (err) console.log(err);
      console.log("Connected to DB!");
      connection.release();
    });
    socketIO(server);
  };

  return {
    create,
    start
  };
};
