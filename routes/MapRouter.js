import express from "express";
import { newMap, getMapById, deleteMapById, updateMapById, listMap } from "../controllers/MapController.js";
const router = express.Router();

router.post('/', newMap);
router.get('/', listMap);
router.get('/:id', getMapById);
router.put('/:id', updateMapById);
router.delete('/:id', deleteMapById);

export default router;
