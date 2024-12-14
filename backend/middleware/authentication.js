const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const validToken = jwt.verify(token, process.env.SECRET);
      req.token = validToken;
      next();
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Authorization header is missing" });
  }
};

module.exports = auth;
