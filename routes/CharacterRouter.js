import express from 'express';
import { deleteCharacterById, getCharacterById, newCharacter, updateCharacterById, listCharacter } from '../controllers/CharacterController.js';
const router = express.Router();

router.post('/', newCharacter);
router.get('/:id', getCharacterById);
router.delete('/:id', deleteCharacterById);
router.put('/:id', updateCharacterById);
router.get('/', listCharacter);

export default router;