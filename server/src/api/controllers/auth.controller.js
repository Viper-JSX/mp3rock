import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../../lib/utilities/generateTokenAndSetCookie.js";


const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "User with such email does not exist" });
        }

        const userId = user._id.toString();
        const isPasswordsMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordsMatch) {
            return res.status(401).json({ error: "Wrong password" });
        }

        generateTokenAndSetCookie({ userId }, res);

        res.status(200).json({ user, message: "Sign-in successfull" });

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Server error when signing-in" })
    }
}


const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email and password are required" });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(401).json({ error: "User with such email already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, passwordHash });
        const userId = newUser._id.toString();

        generateTokenAndSetCookie({ userId }, res);
    
        res.status(200).json({ message: "User created successfully", newUser });
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Error when signing up" });
    }
}   


const authorize = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if(!user) {
            return req.status(404).json({ error: "User does not exist" });
        }

        res.status(200).json({ user, message: "Authorized successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error when authorizing" });
    }

}


export { signIn, signUp, authorize };