import express from "express";
import { newMission, getMissionById, deleteMissionById, updateMissionById } from "../controllers/MissionController.js";
const router = express.Router();

router.post('/', newMission);
router.get('/:id', getMissionById);
router.put('/:id', updateMissionById);
router.delete('/:id', deleteMissionById);

export default router;
