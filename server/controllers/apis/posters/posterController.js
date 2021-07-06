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
  GET_MY_POSTERS,
  DELETE_POSTER,
  GET_REQ_BY_SENDER,
  TITLE_ORDER
} = require("../../../constants");
const { model } = require("../../../models/model");
const ApiError = require("../../../error/ApiError");
const { emailFromUrl } = require("../../../utils/emaiFromUrl");

async function createPoster(req, res, next) {
  const { file } = req;
  const {
    email,
    title,
    text,
    type,
    age_from,
    age_to,
    imageName,
    genders,
    country,
    cities
  } = req.body;

  const citiesArr = cities.split(",");
  const gendersArr = genders.split(",");
  let age_to_num = null;
  let age_from_num = null;

  if (age_to !== "null") age_to_num = parseInt(age_to);
  if (age_from !== "null") age_from_num = parseInt(age_from);

  let image = imageName;
  if (file) image = file.filename;

  const uid = await model(GET_UID_BY_EMAIL, email);
  if (uid.length === 0) {
    console.error("uid.length === 0");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }
  const [{ id: user_id }] = uid;

  const post_data = [
    user_id,
    text,
    title,
    type,
    image,
    age_to_num,
    age_from_num
  ];
  const poster = await model(POST_POSTER, post_data);
  if (poster.length < 1) {
    console.error("poster.length < 1");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }
  const poster_id = poster.insertId;

  const GET_REGIONS =
    GET_COUNTRY + Array(citiesArr.length - 1).join(" OR city = ?");
  const reg_ids = await model(GET_REGIONS, [country, ...citiesArr]);
  if (reg_ids.length === 0) {
    console.error("reg_ids.length === 0");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }

  reg_ids.forEach(async ({ id: region_id }) => {
    await model(INSERT_POSTER_REGION, [poster_id, region_id]);
  });
  if (genders.length > 0) {
    const GET_GENDERS =
      GET_GENDER_ID + Array(gendersArr.length).join(" OR name = ?");
    const gen_ids = await model(GET_GENDERS, [...gendersArr]);
    if (gen_ids.length === 0)
      return next(ApiError.badRequest("A problem with the DB occured."));
    gen_ids.forEach(async ({ id: gender_id }) => {
      await model(INSERT_POSTER_GENDER, [poster_id, gender_id]);
    });
  }

  res.status(200).send("Poster successfully created!");
}

function getAllPosters(req, res, next) {
  const email = emailFromUrl(req.url);

  const posters = model(GET_ALL_POSTERS_WUSER + TITLE_ORDER);
  const genders = model(GET_ALL_PG);
  const regions = model(GET_ALL_PR);
  const connetions = model(GET_REQ_BY_SENDER, email);

  Promise.all([posters, genders, regions, connetions])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => next(err));
}

function getMyPosters(req, res, next) {
  const email = emailFromUrl(req.url);

  const posters = model(GET_MY_POSTERS, email);
  const genders = model(GET_ALL_PG);
  const regions = model(GET_ALL_PR);
  const connetions = model(GET_REQ_BY_SENDER, email);

  Promise.all([posters, genders, regions, connetions])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => next(err));
}

const deletePoster = (req, res, next) => {
  const url = req.url.split("=");
  const id = url[1];
  console.log(id);
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

  deletePoster
};
