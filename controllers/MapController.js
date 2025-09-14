import Map from "../models/MapModel.js";

const newMap = async (request, response) => {
    try {
        const map = new Map(request.body);
        const savedMap = await map.save();
        response.status(201).json(savedMap);
    } catch (error) {
        response.status(400).json({ message: "Error al crear el mapa", error: error.message });
    }
};

const getMapById = async (request, response) => {
    try {
        const { id } = request.params;
        const map = await Map.findById(id);

        if (!map) {
            return response.status(404).json({ message: "Mapa no encontrado" });
        }

        response.json(map);
    } catch (error) {
        response.status(500).json({ message: "Error al obtener el mapa", error: error.message });
    }
};

const deleteMapById = async (request, response) => {
    try {
        const { id } = request.params;
        const map = await Map.findByIdAndDelete(id);

        if (!map) {
            return response.status(404).json({ message: "Mapa no encontrado" });
        }

        response.json({ message: "Mapa eliminado correctamente" });
    } catch (error) {
        response.status(500).json({ message: "Error al eliminar el mapa", error: error.message });
    }
};

const updateMapById = async (request, response) => {
    try {
        const { id } = request.params;
        const updatedMap = await Map.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true
        });

        if (!updatedMap) {
            return response.status(404).json({ message: "Mapa no encontrado" });
        }

        response.json(updatedMap);
    } catch (error) {
        response.status(400).json({ message: "Error al actualizar el mapa", error: error.message });
    }
};

export {
    newMap, getMapById, deleteMapById, updateMapById
};