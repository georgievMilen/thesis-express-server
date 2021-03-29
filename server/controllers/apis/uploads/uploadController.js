const {
  insertImageDB,
  getImageDB
} = require("../../../models/images/imagesModel");
const { readDir } = require("../../../utils/fileUtil");

function uploadFile(req, res, next) {
  const { id } = req.params;
  if (req.file === undefined) {
    return res.send("You must select a file.");
  }
  const date = new Date();
  const imageData = {
    id: null,
    user_account_id: req.params.id,
    destination: req.file.destination,
    filename: req.file.filename,
    time_added: date,
    active: true
  };

  insertImageDB(imageData)
    .then(() => {
      res.json("File uploaded successfully");
    })
    .catch((err) => next(err));
}

function getUploadedFile(req, res, next) {
  const { id } = req.params;
  let imageData;

  getImageDB(id)
    .then((userPhoto) => {
      if (!userPhoto) return next("No user image found!");

      imageData = userPhoto[0];

      return readDir(userPhoto[0].destination);
    })
    .then((imageFilesArr) => {
      if (!imageFilesArr.length) return next("No images file found!");
      const image = imageFilesArr.filter(
        (value) => value === imageData.filename
      );
      if (!image.length) return next("No image found!");
      res.json(imageData.destination + imageData.filename);
    })
    .catch((err) => next(err));
}

module.exports = { uploadFile, getUploadedFile };
