import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    password: {type: String, required: true},
    link: {type: String}
});

const Link = mongoose.model("Link", linkSchema);
export default Link;
