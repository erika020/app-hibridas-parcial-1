import mongoose from "mongoose";
const Schema = mongoose.Schema;

const missionSchema = new Schema({
    name: String,
    plot: String,
    team: String,
    enemies: [String],
    place: String,
    objective: String,
    date: {type: Date}
})

const Mission = mongoose.model("Mission", missionSchema);
export default Mission;