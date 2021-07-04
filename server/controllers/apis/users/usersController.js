"use strict";

const { GET_USER_DATA } = require("../../../constants");
const { INSERT_USER } = require("../../../constants");
const { UDPATE_USER } = require("../../../constants");
const { GET_GENDER_ID } = require("../../../constants");
const { refreshTokenGenerate } = require("../../../utils/jwtUtil");
const { accessTokenGenerate } = require("../../../utils/jwtUtil");
const { emailFromUrl } = require("../../../utils/emaiFromUrl");
const ApiError = require("../../../error/ApiError");
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
  const email = emailFromUrl(req.url);

  model(GET_USER_DATA, email)
    .then((result) => {
      console.log(result);
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
  const { file } = req;

  let image = "";
  const body = Object.assign({}, req.body);
  const {
    firstName,
    lastName,
    birthDate,
    email,
    username,
    age,
    gender,
    weight,
    height,
    eyeColor,
    hairColor,
    imageName,
    about
  } = body;

  console.log({ birthDate });
  image = imageName;
  if (file) image = file.filename;

  const genderID = await model(GET_GENDER_ID, gender);
  if (genderID.length < 1) {
    console.error("Problem with genders!");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }
  const [{ id: gender_id }] = genderID;

  const userAccountData = [
    firstName,
    lastName,
    birthDate,
    email,
    username,
    age,
    gender_id,
    weight,
    height,
    eyeColor,
    hairColor,
    image,
    about,
    email
  ];

  model(UDPATE_USER, userAccountData)
    .then((result) => {
      if (result.affectedRows < 1) {
        console.error("Problem while updatind user!");
        return next(ApiError.badRequest("A problem with the DB occured."));
      }
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
