const jwt = require('jsonwebtoken');
const User = require("../models/User");
const requireAuth = async (req, res, next) => {
    console.log("--- Inside requireAuth middleware ---");

    console.log("Full req.headers object:", req.headers);

    console.log("req.headers.authorization:", req.headers.authorization);

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("Auth header missing or malformed in standard format.");
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token Part:", token);

        if (!token) {
            console.log("Token extraction failed after split.");
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            console.log("User not found for token.");
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        console.log("Authentication successful, proceeding to next middleware/route handler.");
        next();
    } catch (err) {
        console.error("JWT error:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = requireAuth;