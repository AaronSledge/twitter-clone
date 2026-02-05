import express from "express";
const router = express.Router();
import User from "../schema/UserSchema.js";

//login route
router.get("/login", async (req, res) => {
    try {
        //req.query is for get request
        console.log(req.query)
        const { email } = req.query;
        
        //find any instance of that email within User table
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            return res.status(400).json({ message: "Account not found under that email "}); 
        };
    //if they are some issues on the server side
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;