import mongoose from "mongoose";
const Schema = mongoose.Schema;

const weaponSchema = new Schema({
    name: String,
    image: String,
    features: {
        weaponClass: String,
        damage: String,
        caliber: String,
        fireRate: String,
        startAmmo: Number,
        maxAmmo: String,
        reloadTime: Number,
        recoil: String
    }
});

const Weapon = mongoose.model("Weapon", weaponSchema);
export default Weapon;

// {
//     "name": "",
//     "image": "",
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

// {
//     "name": "XM4",
//     "image": "https://static.wikia.nocookie.net/callofduty/images/7/73/XM4_Gunsmith_Preview_BOCW.png/revision/latest?cb=20230729181632",
//     "features":{
//         "weaponClass": "Assault Rifle",
//         "damage": "28-24-21-17",
//         "caliber": "5.56 NATO",
//         "fireRate": "722 RPM",
//         "startAmmo": 360,
//         "maxAmmo": "30+180",
//         "reloadTime": 2.1,
//         "recoil": "Low-Moderate"
//     }
// }