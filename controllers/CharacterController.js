import Character from '../models/CharacterModel.js';

const newCharacter = async (req, res) => {
    const {name, skills, ranger, gender, image} = request.body;
    const character = newCharacter({name, skills, ranger, gender, image});
    const data = await character.save();
    response.status(201).json({msg:"ok", data});
}

const getCharacterById = async (req, res) => {
    const id = req.params.id;
    const character = await Character.findByIdAndDelete(id);
    if(character){
        res.status(200).json({mgs: 'Personaje eliminado'});
    }else{
        res.status(404).json({msg: 'Personaje no encontrado'});
    }
}

const deleteCharacterById = async (req, res) => {
    const id = req.params.id;
    const character = await Character.findByIdAndDelete(id);
    if(character){
        res.status(200).json({mgs: 'Personaje eliminado'});
    }else{
        res.status(404).json({msg: 'Personaje no encontrado'});
    }
}

const updateCharacterById = async (req, res) =>{
    const id = req.params.id;
    const body = req.body;

    const character = await User.findByIdAndUpdate(id, body);
    if(character){
        res.status(200).json({mgs: 'Personaje eliminado'});
    }else{
        res.status(404).json({msg: 'Personaje no encontrado'});
    }
}
export{
    newCharacter, getCharacterById, deleteCharacterById, updateCharacterById
};