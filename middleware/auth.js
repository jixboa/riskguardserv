const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Not Logged in..");

  try {
    const secretKey = require("../config/keys").SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("Invalid Login details");
    console.log(error.message);
  }
}

module.exports = auth;
