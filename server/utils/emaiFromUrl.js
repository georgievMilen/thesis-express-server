const emailFromUrl = (url) => {
  const urlArr = url.split("=");
  const email = urlArr[1];
  const decodedEmail = decodeURIComponent(email);
  return decodedEmail;
};

module.exports = { emailFromUrl };
