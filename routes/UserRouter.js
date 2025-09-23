import express from 'express';
import { newUser, getUserById,  deleteUserById, updateUserById, listUser, auth } from "../controllers/UserController.js";
import { valToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/auth', auth);
router.post('/', newUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);
router.get('/', valToken, listUser);

export default router;