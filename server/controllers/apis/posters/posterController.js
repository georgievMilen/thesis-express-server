"use strict";
const {
  GET_UID_BY_EMAIL,
  POST_POSTER,
  GET_COUNTRY,
  GET_ALL_PR,
  GET_ALL_PG,
  INSERT_POSTER_REGION,
  GET_GENDER_ID,
  INSERT_POSTER_GENDER,
  GET_ALL_POSTERS_WUSER,
  CREATE_CONNECTION,
  GET_MY_POSTERS,
  DELETE_POSTER
} = require("../../../constants");
const { model } = require("../../../models/model");
const ApiError = require("../../../error/ApiError");

async function createPoster(req, res, next) {
  const {
    email,
    title,
    text,
    type,
    age_from,
    age_to,
    image,
    genders,
    country,
    cities
  } = req.body;

  const uid = await model(GET_UID_BY_EMAIL, email);
  if (uid.length === 0)
    next(ApiError.badRequest("A problem with the DB occured."));
  const [{ id: user_id }] = uid;

  const post_data = [user_id, text, title, type, image, age_from, age_to];
  const poster = await model(POST_POSTER, post_data);
  if (poster.length < 1)
    next(ApiError.badRequest("A problem with the DB occured."));

  const poster_id = poster.insertId;
  const GET_REGIONS = GET_COUNTRY + Array(cities.length).join(" OR city = ?");
  const reg_ids = await model(GET_REGIONS, [country, ...cities]);
  if (reg_ids.length === 0)
    next(ApiError.badRequest("A problem with the DB occured."));

  reg_ids.forEach(async ({ id: region_id }) => {
    await model(INSERT_POSTER_REGION, [poster_id, region_id]);
  });
  if (genders.length > 0) {
    const GET_GENDERS =
      GET_GENDER_ID + Array(genders.length).join(" OR name = ?");
    const gen_ids = await model(GET_GENDERS, [...genders]);
    if (gen_ids.length === 0)
      next(ApiError.badRequest("A problem with the DB occured."));
    gen_ids.forEach(async ({ id: gender_id }) => {
      await model(INSERT_POSTER_GENDER, [poster_id, gender_id]);
    });
  }

  res.status(200).send("Poster successfully created!");
}

function getAllPosters(req, res, next) {
  const posters = model(GET_ALL_POSTERS_WUSER);
  const genders = model(GET_ALL_PG);
  const regions = model(GET_ALL_PR);
  Promise.all([posters, genders, regions])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => next(err));
}

function getMyPosters(req, res, next) {
  const url = req.url.split("=");
  const email = url[1];

  const posters = model(GET_MY_POSTERS, email);
  const genders = model(GET_ALL_PG);
  const regions = model(GET_ALL_PR);
  Promise.all([posters, genders, regions])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => next(err));
}

async function sendConnectionRequest(req, res, next) {
  const { postId, email } = req.body;
  const uid = await model(GET_UID_BY_EMAIL, email);
  if (uid.length === 0)
    next(ApiError.badRequest("A problem with the DB occured."));
  const [{ id: user_id }] = uid;

  model(CREATE_CONNECTION, [postId, user_id])
    .then(() => {
      res.status(200).send("Request was send!");
    })
    .catch((err) => next(err));
}

const deletePoster = (req, res, next) => {
  const url = req.url.split("=");
  const id = url[1];

  model(DELETE_POSTER, id)
    .then(() => {
      res.status(200).send("Poster was deleted!");
    })
    .catch((err) => {
      console.log("deletePoster catch");
      next(err);
    });
};

module.exports = {
  createPoster,
  getAllPosters,
  getMyPosters,
  sendConnectionRequest,
  deletePoster
};
