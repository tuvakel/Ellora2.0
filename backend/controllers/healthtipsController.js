const Healthtips = require("../models/Healthtips");

// POST /api/healthtips
exports.createHealthtip = async(req, res) => {
    const healthtip = await Healthtip.create({...req.body, userId: req.user.id});
    res.json(healthtip);
};

//GET /api/healthtips/all
exports.getAllHealthtips = async(req, res) => {
    const healthtips = await Healthtip.find().populate("userId", "firstname lastname email");
    res.json(healthtips);
};

//PUT /api/healthtips/:id
exports.updateHealthtip = async(re, res) => {
    try {
        const healthtip = await Healthtip.findById(req.params.id);

        if(!healthtip) {
            return res.status(404).json({ message: "Healthtip not found"});
        }

        //checking if user owns the healthtip           
        if(healthtip.userId.toString() !== req.user.id){
                return res.status(403).json({ message: "Not authorized to update this healthtip"});
        }

        const updateHealthtip = await Healthtip.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        res.json(updateHealthtip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete /api/healthtips/:id
exports.deleteHealthtip = async (req, res) => {
    try {
        const healthtip = await Healthtip.findById(req.params.id);

        if (!healthtip){
            return res.status(404).json({ message: "Healthtip not found"});
        }

        if (healthtip.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized to delete this healthtip"});
        }

        await Healthtip.findByIdAndDelete(req.params.id);
        res.json({ message: "Healthtip delete successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};