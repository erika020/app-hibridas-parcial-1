import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const valToken = (request, response, next) => {
    const token = request.headers.autorization;
    if(!token){
        response.status(401).json({ msg: 'falta el token'});
    }
    console.log(token);

    next();
}

export { valToken}