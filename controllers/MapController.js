import Map from "../models/MapModel.js";

const newMap = async (request, response) => {
    const { name, teams, location, date, terrain, modes } = request.body;
    const map = new Map({ name, teams, location, date, terrain, modes });
    const data = await map.save();
    response.status(201).json({ msg: 'map created', data });
}

const listMap = async (request, response) =>{
    const map = await Map.find();
    response.json(map);
}

const getMapById = async (request, response) => {
    const id = request.params.id;
    const map = await Map.findById(id);
    if (map) {
        response.status(200).json(map);
    } else {
        response.status(404).json({ msg: 'map not found' });
    }
}

const deleteMapById = async (request, response) => {
    const id = request.params.id;
    const map = await Map.findByIdAndDelete(id);
    if (map) {
        response.status(200).json({ msg: 'map deleted' });
    } else {
        response.status(404).json({ msg: 'map not found' });
    }
}

const updateMapById = async (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const map = await Map.findByIdAndUpdate(id, body);
    if (map) {
        response.status(200).json({ msg: 'map updated' });
    } else {
        response.status(404).json({ msg: 'map not found' });
    }
}

export {
    newMap, getMapById, deleteMapById, updateMapById, listMap
};
