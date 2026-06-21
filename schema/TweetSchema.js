import mongoose from "mongoose"
const { Schema } = mongoose;

const TweetSchema = new Schema({
    username: { type: String, required: true },
    handle: { type: String, required: true },
    pfpKey: { type: String, default: "Default.png" },
    dateOfTweet: { type: Date, default: Date.now },
    text: { type: String, required: true},
    media: { type: String, default: ""},
    repliedUnder: { type: String, default: ""},
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Tweet", TweetSchema);