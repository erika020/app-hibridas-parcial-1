import mongoose from "mongoose";
const Schema = mongoose.Schema;

const modeSchema = new Schema({
    name: String,
    description: String,
    rules: String
})

const Mode = mongoose.model("Mode", modeSchema);
export default Mode;