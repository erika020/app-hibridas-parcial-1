import characterRouter from './CharacterRouter.js';
const routerAPI = (app) =>{
    app.use('/api/character', characterRouter);
}
export default routerAPI;