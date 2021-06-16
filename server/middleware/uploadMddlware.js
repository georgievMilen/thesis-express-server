const { upload } = require("../utils/upload");

function uploadImage(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    next();
  });
}

module.exports = {
  uploadImage
};
