import characterRouter from './CharacterRouter.js';
import weaponRouter from './WeaponRouter.js';
import achievementRouter from './AchievementRouter.js';

const routerAPI = (app) =>{
    app.use('/api/character', characterRouter);
    app.use('/api/weapon', weaponRouter);
    app.use('/api/achievement', achievementRouter);
}
export default routerAPI;