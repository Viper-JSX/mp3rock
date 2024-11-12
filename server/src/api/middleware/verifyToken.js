import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

async function verifyToken (req, res, next) {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(403).json({ erorr: "Unauthorized: No Token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(403).json({ error: "Unauthorized: Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password"); //Exclude the password
    
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("Error in verifyToken middleware", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default verifyToken;