import express from 'express';
import { deleteCharacterById, getCharacterById, newCharacter, updateCharacterById } from '../controllers/CharacterController.js';
const router = express.Router();

router.get('/', newCharacter);
router.get('/:id', getCharacterById);
router.get('/:id', deleteCharacterById);
router.get('/:id', updateCharacterById);

export default router;