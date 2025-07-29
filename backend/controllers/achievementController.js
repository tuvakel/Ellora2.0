const Achievement = require("../models/Achievement");

// POST /api/achievements
exports.createAchievement = async(req, res) => {
    const achievement = await Achievement.create({...req.body, userId: req.user.id});
    res.json(achievement);
};

//GET /api/achievements/all
exports.getAllAchievements = async(req, res) => {
    const achievements = await Achievement.find().populate("userId", "firstname lastname email");
    res.json(achievements);
};

//PUT /api/achievements/:id
exports.updateAchievement = async(re, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);

        if(!achievement) {
            return res.status(404).json({ message: "Achievement not found"});
        }

        //checking if user owns the achievement           
        if(achievement.userId.toString() !== req.user.id){
                return res.status(403).json({ message: "Not authorized to update this achievement"});
        }

        const updateAchievement = await Achievement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        res.json(updateAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete /api/achievements/:id
exports.deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);

        if (!achievement){
            return res.status(404).json({ message: "Achievement not found"});
        }

        if (achievement.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized to delete this achievement"});
        }

        await Achievement.findByIdAndDelete(req.params.id);
        res.json({ message: "Achievement delete successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};