import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "isAuthenticated",
      success: false,
    });
  }
};

export default isAuthenticated;
