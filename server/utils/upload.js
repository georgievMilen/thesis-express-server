const multer = require("multer");
const { BASEDIR } = require("../constants");

function imageFilter(req, file, callback) {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback("Please upload only images.", false);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, BASEDIR + "/resources/static/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: imageFilter
}).single("file");

module.exports = { upload };
