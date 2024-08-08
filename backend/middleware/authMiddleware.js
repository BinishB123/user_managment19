const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");
const adminModel = require('../Model/adminModel')

const checker = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      

      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECERT);
      const user = await userModel
        .findById({ _id: decoded.id })
        .select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      req.user = user; // Attach user to request
      next();
    } catch (error) {
      res.status(401);
      console.log("error message", error.message);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401).json({ message: "Unauthorized user" });
    console.log("Unauthorized user");
  }
};

const adminChecker = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      

      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECERT);
      const user = await adminModel
        .findById({ _id: decoded.id })
        .select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      req.user = user; // Attach user to request
      next();
    } catch (error) {
      res.status(401);
      console.log("error message", error.message);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401).json({ message: "Unauthorized user" });
    console.log("Unauthorized user");
  }
};

module.exports = { checker,adminChecker };
