import mongoose from "mongoose";
const Schema = mongoose.Schema;

const missionSchema = new Schema({
    name: String,
    plot: String,
    team: String,
    enemies: [String],
    Place: String,
    objective: String,
    date: {type: Date}
})

const Mission = moongose.model("Mission", missionSchema);
export default Mission;