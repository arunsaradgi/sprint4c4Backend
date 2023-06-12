const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "arun");
      if (decoded) {
        req.body.user = decoded.user;
        req.body.userId = decoded.userId;
        next();
      } else {
        res.status(200).json({ msg: "not authorized" });
      }
    } catch (error) {
      res.status(202).json({ msg: error.message });
    }
  } else {
    res.status(400).json({ msg: "please login" });
  }
};

module.exports = {
  auth,
};
