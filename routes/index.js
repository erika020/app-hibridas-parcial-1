import characterRouter from './CharacterRouter.js';
import weaponRouter from './WeaponRouter.js';
import achievementRouter from './AchievementRouter.js';
import mapRouter from './MapRouter.js';
import missionRouter from './MissionRouter.js';
import modeRouter from './ModeRouter.js';

const routerAPI = (app) =>{
    app.use('/api/character', characterRouter);
    app.use('/api/weapon', weaponRouter);
    app.use('/api/achievement', achievementRouter);
    app.use('/api/map', mapRouter);
    app.use('/api/mission', missionRouter);
    app.use('/api/mode', modeRouter);

}
export default routerAPI;