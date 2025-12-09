import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const validarToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ msg: "Falta el Token" });
    }

    const token = header.startsWith("Bearer ") ? header.slice(7) : header;

    jsonwebtoken.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Token inválido" });

        req.user = {
            id: decoded.id,
            email: decoded.email,
            rol: decoded.rol
        };

        next();
    });
};

export { validarToken };
