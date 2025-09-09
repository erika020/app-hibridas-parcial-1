import mongoose from "mongoose";
const Esquema = mongoose.esquema;

const esquema = new esquema({
    nombre: String,
    rango: String,
    imagen: String,
})