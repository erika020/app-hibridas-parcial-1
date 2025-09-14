import express from "express";
import { newMode, getModeById, deleteModeById, updateModeById } from "../controllers/ModeController.js";
const router = express.Router();

router.post('/', newMode);
router.get('/:id', getModeById);
router.put('/:id', updateModeById);
router.delete('/:id', deleteModeById);

export default router;
