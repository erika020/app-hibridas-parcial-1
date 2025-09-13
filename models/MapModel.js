import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mapSchema = new Schema({
    name: String,
    teams: [String],
    location: String,
    date: {
        type: Date
    },
    terrain: String,
    modes: String
})

const Map = mongoose.model("Map", mapSchema);
export default Map;