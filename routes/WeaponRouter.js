import express from 'express';
import { newWeapon, getWeaponById, deleteWeaponById, updateWeaponById, listWeapon } from '../controllers/WeaponController.js';
const router = express.Router();

router.post('/', newWeapon);
router.get('/', listWeapon);
router.get('/:id', getWeaponById);
router.delete('/:id', deleteWeaponById);
router.put('/:id', updateWeaponById);

export default router;