import jwt from "jsonwebtoken";

const SECRET = "secretkey";

/**
 * Attaches decoded JWT payload to req.user.
 * Use requireRole(...roles) to additionally gate by role.
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing. Please login first." });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid Authorization format." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing in Authorization header." });
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: `Access denied. Required role: ${roles.join(" or ")}` });
  }
  next();
};