const { expressjwt: jwt } = require("express-jwt");

const authenticateJWT = jwt({
  secret: process.env.JWT_SECRET, // Make sure this matches your JWT signing secret
  algorithms: ["HS256"],
  requestProperty: "user", // sets req.user
});

module.exports = authenticateJWT;