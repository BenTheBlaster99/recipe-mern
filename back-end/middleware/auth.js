const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["authorization"].replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "no token no entry" });
  }
  try {
    const decoded_token = jwt.verify(token, "secret-key");
    req.user = decoded_token;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "invadil token" });
  }
};
const authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "your permissions are not enough" });
    }
    next();
  };
};
module.exports = { authentication, authorization };
