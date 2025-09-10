import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    skills:[String],
    ranges: String,
    gender: {
        type: String,
        enum: ["masculine", "feminine"],
    },
    image: String,
});

const Character = mongoose.model('Character', schema);
export default Character;