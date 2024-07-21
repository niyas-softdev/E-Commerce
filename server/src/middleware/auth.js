const passport = require("passport");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT token for authenticated users
const generateAuthTokens = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const token = jwt.sign(
    {
      _id: user._id,

      role: user.userRole
    },
    JWT_SECRET,
    {
      expiresIn: "24h"
    }
  );
  res.status(200).json({ message: "Authenticated successfully", token, user });
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    return passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err || !user) {
        console.error("JWT Authentication Error:", err || info); // Log authentication error
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
  
  const verifyRole = (roles) => {
    return (req, res, next) => {
      console.log('User:', req.user); // Log user info
      console.log('Required roles:', roles); // Log required roles
      if (req.user && roles.includes(req.user.userRole)) {
        return next();
      }
      console.error("Forbidden: User does not have required roles");
      res.status(403).json({ message: "Forbidden", requiredRoles: roles, userRole: req.user ? req.user.userRole : 'None' });
    };
  };

module.exports = {
  generateAuthTokens,
  isAuthenticated,
  verifyToken,
  verifyRole
};
