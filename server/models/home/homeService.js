function getInfo(req, res) {
  if (req.session.loggedin) {
    res.json("Welcome back, " + req.session.username + "!");
  } else {
    res.json("Please login to view this page!");
  }
  res.end();
}

module.exports = {getInfo: getInfo};
