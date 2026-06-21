import express from "express";
const router = express.Router();
import User from "../schema/UserSchema.js";
import Tweet from "../schema/TweetSchema.js"
import bcryptjs from "bcryptjs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { jwtAuth } from "./Auth.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jwt from "jsonwebtoken";

router.post("/post", jwtAuth, async (req, res) => {
    try {
        const existingUser = await User.findById(req.userID);
        const { text } = req.body;
        const newTweet = new Tweet({
            username: existingUser.username,
            handle: existingUser.handle,
            pfpkey: existingUser.pfpKey,
            text: text,
        })
        newTweet.save();
        res.json({ message: "Tweet successful", tweet: newTweet});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router