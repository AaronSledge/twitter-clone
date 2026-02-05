import mongoose from "mongoose"
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    username2: {type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    bio: {type: String, default: "" },
    pfp: { type: String, default: null },
    header: { type: String, default: null},
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now }

});



export default mongoose.model("User", userSchema);