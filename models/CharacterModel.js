import mongoose from "mongoose";
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: String,
    description: String,
    rank: [String],
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    weapons: [String],
    equipment: [String],
    image: String
});

const Character = mongoose.model('Character', characterSchema);
export default Character;

// {
//     "name": "",
//     "description": "",
//     "ranges": "",
//     "gender": "",
//     "weapons": [],
//     "equipment": [],
//     "image:" ""
// }