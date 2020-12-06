const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "No token, authoriztion denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "You need to login first" });
  }
};

module.exports = isAuth;
