const jwt = require("jsonwebtoken");// npm install
module.exports = (req, res, next) => {
  try {
    // just a middleware function witch ex in incoming request
    const token = req.headers.authorization.split(" ")[1]; //some-Word 'my token'
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (error) {
    res.status(401).json({ massage: "Auth failed!" });
  }
};

