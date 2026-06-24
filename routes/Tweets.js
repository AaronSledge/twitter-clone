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

router.post("/userTweets", async (req, res) => {
    try {
        const { handle } = req.body;
        const userTweets = await Tweet.find({ handle: handle})
        const bucketName = process.env.BUCKET_NAME;
        const bucketRegion = process.env.BUCKET_REGION;
        const s3 = new S3Client ({
            region: bucketRegion
        })

        const allTweets = await Promise.all(
            userTweets.map(async (tweet) => {
                const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: tweet.pfpKey
                });

                const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
                return {
                    _id: tweet._id,
                    username: tweet.username,
                    handle: tweet.handle,
                    pfpkey: signedUrl,
                    dateOfTweet: tweet.dateOfTweet,
                    text: tweet.text,
                    media: tweet.media,
                    replies: tweet.replies,
                    retweets: tweet.retweets,
                    likes: tweet.likes 
                }
            })
        );

        res.json(allTweets);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

export default router