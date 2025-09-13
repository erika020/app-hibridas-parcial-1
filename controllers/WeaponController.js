import Weapon from '../models/WeaponModel.js';

const newWeapon = async (request, response) => {
    const { name, description, image, features } = request.body;
    const weapon = new Weapon({ name, description, image, features });
    const data = await weapon.save();
    response.status(201).json({ msg:"weapon created", data });
}

const getWeaponById = async (request, response) => {
    const id = request.params.id;
    const weapon = await Weapon.findById(id);
    if(weapon){
        response.status(200).json(weapon);
    }else{
        response.status(404).json({ msg: 'weapon not found' });
    }
}

const deleteWeaponById = async (request, response) => {
    const id = request.params.id;
    const weapon = await Weapon.findByIdAndDelete(id);
    if(weapon){
        response.status(200).json({ mgs: 'weapon deleted'});
    }else{
        response.status(404).json({ msg: 'weapon not found' });
    }
}

const updateWeaponById = async (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const weapon = await Weapon.findByIdAndUpdate(id, body);
    if(weapon){
        response.status(200).json({ mgs: 'weapon updated' });
    }else{
        response.status(404).json({ msg: 'weapon not found' });
    }
}
export{
    newWeapon, getWeaponById, deleteWeaponById, updateWeaponById
}