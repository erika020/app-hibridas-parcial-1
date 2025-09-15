import mongoose from "mongoose";
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    name: String,
    description: String,
    points: String  
})

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;