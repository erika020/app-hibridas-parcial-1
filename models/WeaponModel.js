import mongoose from "mongoose";
const Schema = mongoose.Schema;

const weaponSchema = new Schema({
    name: String,
    description: String,
    image: String,
    features: {
        weaponClass: String,
        damage: String,
        caliber: String,
        fireRate: String,
        startAmmo: String,
        maxAmmo: String,
        reloadTime: String,
        recoil: String
    }
});

const Weapon = mongoose.model("Weapon", weaponSchema);
export default Weapon;

// {
//     "name": "",
//     "image": ",
//     "description": ",
//     "features":{
//         "weaponClass": "",
//         "damage": "",
//         "caliber": "",
//         "fireRate": "",
//         "startAmmo": ,
//         "maxAmmo": "",
//         "reloadTime": ,
//         "recoil": "",
//     }
// }