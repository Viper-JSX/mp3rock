import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../../lib/utilities/generateTokenAndSetCookie.js";

const signIn = (req, res) => {

}


const signUp = async (req, res) => {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    generateTokenAndSetCookie(newUser._id.toString(), res);

    res.status(200).json({ message: "User created successfully" });
}   


const authorize = () => {

}


export { signIn, signUp, authorize };