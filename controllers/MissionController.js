import Mission from "../models/MissionModel.js";

const newMission = async (request, response) => {
    const { name, plot, team, enemies, place, objective, date } = request.body;
    const mission = new Mission({ name, plot, team, enemies, place, objective, date });
    const data = await mission.save();
    response.status(201).json({ msg: 'mission created', data });
}

const getMissionById = async (request, response) => {
    const id = request.params.id;
    const mission = await Mission.findById(id);
    if (mission) {
        response.status(200).json(mission);
    } else {
        response.status(404).json({ msg: 'mission not found' });
    }
}

const deleteMissionById = async (request, response) => {
    const id = request.params.id;
    const mission = await Mission.findByIdAndDelete(id);
    if (mission) {
        response.status(200).json({ msg: 'mission deleted' });
    } else {
        response.status(404).json({ msg: 'mission not found' });
    }
}

const updateMissionById = async (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const mission = await Mission.findByIdAndUpdate(id, body);
    if (mission) {
        response.status(200).json({ msg: 'mission updated' });
    } else {
        response.status(404).json({ msg: 'mission not found' });
    }
}

export {
    newMission, getMissionById, deleteMissionById, updateMissionById
};
