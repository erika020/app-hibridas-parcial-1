import Mode from "../models/ModeModel.js";

const newMode = async (request, response) => {
    const { name, description, rules } = request.body;
    const mode = new Mode({ name, description, rules });
    const data = await mode.save();
    response.status(201).json({ msg: 'mode created', data });
}

const getModeById = async (request, response) => {
    const id = request.params.id;
    const mode = await Mode.findById(id);
    if (mode) {
        response.status(200).json(mode);
    } else {
        response.status(404).json({ msg: 'mode not found' });
    }
}

const deleteModeById = async (request, response) => {
    const id = request.params.id;
    const mode = await Mode.findByIdAndDelete(id);
    if (mode) {
        response.status(200).json({ msg: 'mode deleted' });
    } else {
        response.status(404).json({ msg: 'mode not found' });
    }
}

const updateModeById = async (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const mode = await Mode.findByIdAndUpdate(id, body);
    if (mode) {
        response.status(200).json({ msg: 'mode updated' });
    } else {
        response.status(404).json({ msg: 'mode not found' });
    }
}

export {
    newMode, getModeById, deleteModeById, updateModeById
};