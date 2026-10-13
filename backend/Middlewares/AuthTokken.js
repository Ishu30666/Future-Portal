
import jwt from "jsonwebtoken";
import User from "../Models/AuthModels.js";

export const AuthToken = async (req, res, next) => {
  try {
    // Read JWT from the HTTP-only cookie
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Token missing. Please log in again.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.userId) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    // Find user in MongoDB
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found. Please log in again.",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error("AuthToken Error:", error.message);

    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        message: "Session expired or invalid. Please log in again.",
      });
    }

    return res.status(500).json({
      message: "Authentication server error",
    });
  }
};
