import mongoose from "mongoose";
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: String,
    ranges: String,
    gender: {
        type: String,
        enum: ["masculine", "feminine"],
    },
    weapons: [String],
    equipment: [String],
    image: String
});

const Character = mongoose.model('Character', characterSchema);
export default Character;

// {
//     "name": "",
//     "ranges": "",
//     "gender": "",
//     "weapons": [],
//     "equipment": [],
//     "image:" ""
// }