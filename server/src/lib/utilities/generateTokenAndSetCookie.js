import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (user, res) => {
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "10d" });

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, //ms (15 days)
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;