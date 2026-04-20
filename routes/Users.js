import express from "express";
const router = express.Router();
import User from "../schema/UserSchema.js";
import bcryptjs from "bcryptjs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { jwtAuth } from "./Auth.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jwt from "jsonwebtoken";




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

        //create a token with the payload, secret key, and expiration date(if expires user must log in again)
        const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, { expiresIn: "2h"});

        //store token in browser
        res.cookie("token", token, {
            httpOnly: true
        })

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

router.get("/me", jwtAuth, async (req, res) => {
    try {
        //use find the specfic user from ID
        const existingUser = await User.findById(req.userID);
        const bucketName = process.env.BUCKET_NAME;
        const bucketRegion = process.env.BUCKET_REGION;
        const s3 = new S3Client ({
            region: bucketRegion
        })
        
        //used to get image url from s3 bucket
        const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: existingUser.pfpKey
        })

        //signed url since bucket is private
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        res.json({
            username: existingUser.username,
            handle: existingUser.handle,
            pfp: signedUrl
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;