import express from "express";

import userRoutes from "./UserRouter.js";
import weaponRoutes from "./WeaponRouter.js";
import characterRoutes from "./CharacterRouter.js";
import mapRoutes from "./MapRouter.js";
import missionRoutes from "./MissionRouter.js";
import modeRoutes from "./ModeRouter.js";
import achievementRoutes from "./AchievementRouter.js";

function routerAPI(app) {
  const router = express.Router();
  app.use("/api", router);
  
  router.use("/user", userRoutes);
  router.use("/weapons", weaponRoutes);
  router.use("/characters", characterRoutes);
  router.use("/maps", mapRoutes);
  router.use("/missions", missionRoutes);
  router.use("/mode", modeRoutes);
  router.use("/achievement", achievementRoutes);
}

export default routerAPI;
