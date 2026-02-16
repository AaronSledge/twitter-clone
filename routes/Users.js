import express from "express";
const router = express.Router();
import User from "../schema/UserSchema.js";
import bcryptjs from "bcryptjs";

//login route
router.post("/login", async (req, res) => {
    try {
        //req.query is for get request
        const { email, password } = req.body;

        //find any instance of that email within User table
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            return res.status(400).json({ message: "Account not found under that email "}); 
        }

        const match = await bcryptjs.compare(password, existingUser.password);

        if(!match) {
            return res.status(400).json({ message: "Ivalid email or password" });
        }

        res.json({ message: "Login succesful", user: existingUser});
    //if they are some issues on the server side
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { username, handle, email, password, date } = req.body;

        //hash password before sending to DB
        const saltRounds = 10;
        const newPassword = bcryptjs.hashSync(password, saltRounds);
        const newUser = new User({
            username: username,
            handle: handle,
            email: email,
            password: newPassword,
            bio: "",
            pfp: "",
            dateOfBirth: date,
            header: "",
            followers: null,
            following: null,
            createdAt: Date.now()
        });

        newUser.save();
        res.json({ message: "Login succesful", user: newUser});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;