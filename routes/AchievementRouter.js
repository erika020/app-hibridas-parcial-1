import express from 'express';
import { getAchievementById, deleteAchievementById, updateAchievementById, newAchievement, listAchievement } from '../controllers/AchievementController.js';

const router = express.Router();

router.post('/', newAchievement);
router.get('/:id', getAchievementById);
router.put('/:id', updateAchievementById);
router.delete('/:id', deleteAchievementById);
router.get('/', listAchievement);

export default router;