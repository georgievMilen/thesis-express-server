const multer = require("multer");
const BASEDIR = require("../constants/constants");
const { UPDATE_IMAGE, GET_IMAGE } = require("../constants/imageQueries");
const modal = require("../models/users/usersModel");
const {
  getImageDB,
  updateImageIsActiveDB
} = require("../models/images/imagesModel");

function imageFilter(req, file, callback) {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback("Please upload only images.", false);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, BASEDIR + "/resources/static/assets/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const uploadFileToDisk = multer({ storage: storage, fileFilter: imageFilter });

function imageAlreadyUploaded(req, res, next) {
  const { id } = req.params;
  modal(GET_IMAGE, id).then((image) => {
    if (!image) {
      res.locals.imageAlreadyUploaded = false;
      return next();
    }
    res.locals.imageAlreadyUploaded = true;
    next();
  });
  // getImageDB(id)
  //   .then((image) => {
  //     if (!image) {
  //       res.locals.imageAlreadyUploaded = false;
  //       return next();
  //     }
  //     res.locals.imageAlreadyUploaded = true;
  //     next();
  //   })
  //   .catch((err) => next(err));
}

function updateImageIsActive(req, res, next) {
  const { imageAlreadyUploaded } = res.locals;
  const { id } = req.params;
  if (!imageAlreadyUploaded) return next();
  modal(UPDATE_IMAGE, id)
    .then(() => next())
    .catch((err) => next(err));
  // updateImageIsActiveDB(id, false)
  //   .then(() => {
  //     next();
  //   })
  //   .catch((err) => next(err));
}

module.exports = {
  uploadFileToDisk,
  imageAlreadyUploaded,
  updateImageIsActive
};
