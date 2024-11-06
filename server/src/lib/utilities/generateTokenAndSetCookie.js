import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID, res) => {
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(userID, JWT_SECRET, "", {
        expiresIn: "15d"
    });
    console.log(token);

    res.cookie({
        maxAge: 15*24*60*60*1000, //ms (15 days)
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;