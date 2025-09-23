import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const newUser = async (request, response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password){
        response.status(400).json({ msg: 'faltan campos obligatorios'});
    }

    const user = await User.findOne({email: email});
    if(user){
        response.status(400).json({ msg: 'ya hay un usuario con este email'});
    }

    const data = await user.save();
    response.status(201).json({ msg: 'user created', data });
}

const listUser = async (request, response) =>{
    const user = await User.find();
    response.json(user);
}

const getUserById = async (request, response) => {
    const id = request.params.id;
    const user = await User.findById(id);
    if(user){
        response.status(200).json(user);
    }else{
        response.status(404).json({ msg: 'user not found' });
    }
}

const deleteUserById = async (request, response) => {
    const id = request.params.id;
    const user = await User.findByIdAndDelete(id);
    if(user){
        response.status(200).json({ msg:'User deleted' });
    }else{
        response.status(404).json({ msg:'User not found' });
    }
}

const updateUserById = async (request, response) => {
    const id = request.params.id;
    const user = await User.findByIdAndUpdate(id);
    if(user){
        response.status(200).json({ msg: 'User updated'});
    }else{
        response.status(404).json({ msg: 'user not found'});
    }
}

const auth = async (request, response) =>{
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });
    if ( !user ){
        response.status(404).json({ msg: 'Inavild email'})
    }
    const validom = await bcrypt.compare(password, user.password);
    if ( !validom ){
        response.status(400).json({ msg: 'Invalid password' });
    }

    const data = {
        id: user._id,
        email: user.email
    };

    const jwt = jsonwebtoken.sign(data, SECRET_KEY, {expiresIn: '1h'});
    
    response.status(200).json({ msg: 'usuario valido pero en español:p', jwt: jwt })
}

export { newUser, listUser, getUserById, deleteUserById, updateUserById, auth }