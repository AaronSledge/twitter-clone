import mongoose from "mongoose"
const { Schema } = mongoose;

const TweetSchema = new Schema({
    username: { type: String, required: true },
    handle: { type: String, required: true },
    pfpKey: { type: String, default: "Default.png" },
    dateOfTweet: { type: Date, default: Date.now },
    text: { type: String, required: true},
    media: { type: String, default: ""},
    replies: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    retweets: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Tweet", TweetSchema);