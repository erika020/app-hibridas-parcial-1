import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const newUser = async (req, res) => {
    try {
        const { name, email, password, rol } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'faltan campos obligatorios' });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ msg: 'ya hay un usuario con este email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashed,
            rol: rol || "user"
        });

        const data = await user.save();

        return res.status(201).json({ msg: 'user created', data });

    } catch (error) {
        console.error('Error en newUser:', error);
        return res.status(500).json({ msg: 'error al crear usuario' });
    }
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

const auth = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: 'Invalid email' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(400).json({ msg: 'Invalid password' });
    }

    const payload = {
        id: user._id,
        email: user.email,
        rol: user.rol
    };

    const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: '2h' });

    return res.status(200).json({ msg: 'login correcto', token });
};

export { newUser, listUser, getUserById, deleteUserById, updateUserById, auth };