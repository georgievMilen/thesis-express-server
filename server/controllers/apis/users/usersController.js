"use strict";

const { GET_USER_DATA } = require("../../../constants");
const { INSERT_USER } = require("../../../constants");
const { UDPATE_USER } = require("../../../constants");
const { GET_GENDER_ID } = require("../../../constants");

const { refreshTokenGenerate } = require("../../../utils/jwtUtil");
const { accessTokenGenerate } = require("../../../utils/jwtUtil");

const bcrypt = require("bcrypt");
const { model } = require("../../../models/model");

function logoutUserAction(req, res) {
  req.session.loggedin = false;
  res.status(200).json("Successfull logout");
}

async function createUserAction(req, res, next) {
  const { password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const refresh_token = refreshTokenGenerate(email);

  const userData = {
    ...req.body,
    password: hashedPassword,
    refresh_token
  };

  model(INSERT_USER, userData)
    .then((result) => {
      if (result.length < 1)
        return next(ApiError.badRequest("A problem with the DB occured."));
      res.status(200).json("Successfull registration");
    })
    .catch((error) => {
      next(error);
    });
}

function getProfileInfo(req, res, next) {
  const url = req.url.split("=");
  const email = url[1];
  const decodeEmail = decodeURIComponent(email);
  model(GET_USER_DATA, decodeEmail)
    .then((result) => {
      if (result.length < 1)
        return next(ApiError.badRequest("A problem with the DB occured."));
      const profileInfo = result[0];

      res.status(200).send(profileInfo);
    })
    .catch((error) => next(error));
}

function loginUserAction(req, res) {
  const { email } = req.body;
  let accessToken = accessTokenGenerate(email);
  res.cookie("jwt", accessToken, { httpOnly: true });
  res.status(200).json("Successfull login");
}

async function updateProfile(req, res, next) {
  const { file, body } = req;
  let image = "";
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    username,
    age,
    gender,
    weight,
    height,
    eyeColor: eye_colour,
    hairColor: hair_colour,
    imageName
  } = body;

  image = imageName;
  if (file) image = file.filename;

  const genderID = await model(GET_GENDER_ID, [gender]);
  if (genderID.length < 1)
    return next(ApiError.badRequest("A problem with the DB occured."));
  const [{ id: gender_id }] = genderID;

  const userAccountData = [
    first_name,
    last_name,
    email,
    username,
    age,
    gender_id,
    weight,
    height,
    eye_colour,
    hair_colour,
    image,
    email
  ];

  model(UDPATE_USER, userAccountData)
    .then((result) => {
      if (result.affectedRows < 1)
        return next(ApiError.badRequest("A problem with the DB occured."));
      res.status(200).json("User successfully updated.");
    })
    .catch((error) => next(error));
}

module.exports = {
  createUserAction,
  loginUserAction,
  logoutUserAction,
  updateProfile,

  getProfileInfo
};
