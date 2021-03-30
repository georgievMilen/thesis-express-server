"use strict";

const {
  GET_USER,
  INSERT_USER,
  UDPATE_USER,
  GET_DETAILS,
  INSERT_DETAILS,
  UPDATE_USER_DETAILS,
  GET_INTEREST_IN_RELATION,
  UPDATE_RELATIONSHIPS
} = require("../../../constants/constants");
const {
  refreshTokenGenerate,
  accessTokenGenerate
} = require("../../../utils/jwtUtil");
const bcrypt = require("bcrypt");
const {
  userModal,
  relationModal
} = require("../../../models/users/usersModel");

function logoutUserAction(req, res) {
  req.session.loggedin = false;
  res.status(200).json("Successfull logout");
}

async function createUserAction(req, res, next) {
  const { password, firstName, lastName, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const refreshToken = refreshTokenGenerate(email);

  const details = {
    user_account_id: email
  };

  const userData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: hashedPassword,
    refresh_token: refreshToken
  };

  Promise.all([
    userModal(INSERT_DETAILS, details),
    userModal(INSERT_USER, userData)
  ])
    .then((result) => {
      res.status(200).json("Successfull registration");
    })
    .catch((error) => {
      next(error);
    });
}

function getProfileInfo(req, res, next) {
  const url = req.url.split("=");
  const email = url[1];

  Promise.all([
    userModal(GET_USER, email),
    userModal(GET_DETAILS, email),
    relationModal(GET_INTEREST_IN_RELATION, email)
  ])
    .then((result) => {
      const profileInfo = result[0][0];
      const profileDetails = result[1][0];
      const profileRelationship = result[2];

      res
        .status(200)
        .send({ profileInfo, profileDetails, profileRelationship });
    })
    .catch((error) => {
      next(error);
    });
}

function loginUserAction(req, res) {
  const { email } = req.body;
  let accessToken = accessTokenGenerate(email);
  res.cookie("jwt", accessToken, { httpOnly: true });
  res.status(200).json("Successfull login");
}

function updateProfile(req, res, next) {
  // Send req.body to a function that will save to DB.
  const {
    firstName,
    lastName,
    email,
    age,
    weight,
    height,
    eyeColor,
    hairColor,
    relArrForDB
  } = req.body;

  console.log(req.body);
  const userAccountData = [firstName, lastName, email];
  const userDetailsData = [age, height, weight, hairColor, eyeColor, email];

  const relationshipPromises = [];
  relArrForDB.forEach((relation) => {
    const promise = relationModal(UPDATE_RELATIONSHIPS, [
      relation.checked,
      email,
      relation.name
    ]);
    relationshipPromises.push(promise);
  });

  Promise.all([
    userModal(UDPATE_USER, userAccountData),
    userModal(UPDATE_USER_DETAILS, userDetailsData),
    relationshipPromises
  ])

    .then((result) => {
      console.log("Success");

      res.status(200).json("User successfully updated.");
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  createUserAction,
  loginUserAction,
  logoutUserAction,
  updateProfile,
  getProfileInfo
};
