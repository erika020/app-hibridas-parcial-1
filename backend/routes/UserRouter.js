import express from 'express';
import { 
    newUser, 
    getUserById, 
    deleteUserById, 
    updateUserById, 
    listUser, 
    auth 
} from "../controllers/UserController.js";

import { validarToken } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/auth', auth);

router.post('/', newUser);

router.get("/", validarToken, isAdmin, listUser);

router.get("/:id", validarToken, getUserById);

router.delete("/:id", validarToken, isAdmin, deleteUserById);

router.put("/:id", validarToken, updateUserById);

export default router;
