import Achievement from "../models/AchievementModel.js";   

const newAchievement = async (request, response) => {
    const { name, description, points } = request.body;
    const achievement = new Achievement({ name, description, points });
    const data = await achievement.save();
    response.status(201).json({ msg: 'achievement created', data});
}

const listAchievement = async (request, response) =>{
    const achievement = await Achievement.find();
    response.json(achievement);
}

const getAchievementById = async (request, response) => {
    const id = request.params.id;
    const achievement = await Achievement.findById(id);
    if(achievement){
        response.status(200).json(achievement);
    }else{
        response.status(404).json({ mgs: 'achievement not found' });
    }
}

const deleteAchievementById = async (request, response) => {
    const id = request.params.id;
    const achievement = await Achievement.findByIdAndDelete(id);
    if(achievement){
        response.status(200).json({ mgs: 'achievement deleted' });
    }else{
        response.status(404).json({ msg: 'achievement not found' });
    }
}

const updateAchievementById = async (request, response) =>{
    const id = request.params.id;
    const body = request.body;

    const achievement = await Achievement.findByIdAndUpdate(id, body);
    if(achievement){
        response.status(200).json({ mgs: 'achievement updated' });
    }else{
        response.status(404).json({ msg: 'achievement not found' });
    }
}

export{
    newAchievement, getAchievementById, deleteAchievementById, updateAchievementById, listAchievement
}