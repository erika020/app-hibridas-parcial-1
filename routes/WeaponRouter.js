import express from 'express';
import { newWeapon, getWeaponById, deleteWeaponById, updateWeaponById } from '../controllers/WeaponController.js';
const router = express.Router();

router.post('/', newWeapon);
router.get('/:id', getWeaponById);
router.delete('/:id', deleteWeaponById);
router.put('/:id', updateWeaponById);

export default router;