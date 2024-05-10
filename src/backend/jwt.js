const jwt = require("jsonwebtoken");

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res
    .status(401)
    .send("Unauthorized: Access denied. No token provided.");
  }

  // Check if the token contains the Bearer keyword and remove it
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); 
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden: Invalid token.");
    }

    // Store the decoded token in the request object
    req.user = decoded;
    // Proceed to the next middleware
    next();
  });
};

const authenticate = (action) => {
  return (req, res, next) => {
    if (req.user.role === "ADMIN") {
      // Admin can access all routes
      next();
    } else if (req.user.role === "WRITER" && action !== "DELETE") {
      // Writers can access all routes except DELETE
      next();
    } else if (req.user.role === "VISITOR" && (action === "GET" || action === "PATCH")) {
      // Visitors can only access GET and PATCH routes
      next();
    } else {
      return res
        .status(403)
        .send("Forbidden: You do not have permission to access this route.");
    }
  };
};

module.exports = { authenticateToken, authenticate };