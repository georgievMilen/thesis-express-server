const { model } = require("../models/model");
function credentialIsTaken(query, credential) {
  let res = "";
  return model(query, credential)
    .then((result) => {
      if (!result.length) return;
      res = credential + " already taken!";
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}
module.exports = {
  credentialIsTaken
};
