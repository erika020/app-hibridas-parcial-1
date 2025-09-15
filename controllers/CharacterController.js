import Character from '../models/CharacterModel.js';

const newCharacter = async (request, response) => {
    const { name, description, rank, gender, weapons, equipment, image } = request.body;
    const character = new Character({ name, description, rank, gender, weapons, equipment, image });
    const data = await character.save();
    response.status(201).json({ msg:'character created', data });
}

const listCharacter = async (request, response) =>{
    const character = await Character.find();
    response.json(character);
}

const getCharacterById = async (request, response) => {
    const id = request.params.id;
    const character = await Character.findById(id);
    if(character){
        response.status(200).json(character);
    }else{
        response.status(404).json({ msg: 'character not found' });
    }
}

const deleteCharacterById = async (request, response) => {
    const id = request.params.id;
    const character = await Character.findByIdAndDelete(id);
    if(character){
        response.status(200).json({ mgs: 'character deleted' });
    }else{
        response.status(404).json({ msg: 'character not found' });
    }
}

const updateCharacterById = async (request, response) =>{
    const id = request.params.id;
    const body = request.body;

    const character = await Character.findByIdAndUpdate(id, body);
    if(character){
        response.status(200).json({ mgs: 'character updated' });
    }else{
        response.status(404).json({ msg: 'character not found' });
    }
}
export{
    newCharacter, getCharacterById, deleteCharacterById, updateCharacterById, listCharacter
}