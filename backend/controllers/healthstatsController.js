const Healthstats = require("../models/Healthstats");

// POST /api/healthstats
exports.createHealthstats = async(req, res) => {
    const healthstats = await Healthstats.create({...req.body, userId: req.user.id});
    res.json(healthstats);
};

//GET /api/healthstats/all
exports.getAllHealthstats = async(req, res) => {
    const healthstats = await Healthstats.find().populate("userId", "firstname lastname email");
    res.json(healthstats);
};

//PUT /api/healthstats/:id
exports.updateHealthstats = async(re, res) => {
    try {
        const healthstats = await Healthstats.findById(req.params.id);

        if(!healthstats) {
            return res.status(404).json({ message: "Healthstats not found"});
        }

        //checking if user owns the healthstat           
        if(healthstats.userId.toString() !== req.user.id){
                return res.status(403).json({ message: "Not authorized to update this healthstat"});
        }

        const updateHealthstats = await Healthstats.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        res.json(updateHealthstats);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete /api/healthstats/:id
exports.deleteHealthstats = async (req, res) => {
    try {
        const healthstats = await Healthstats.findById(req.params.id);

        if (!healthstats){
            return res.status(404).json({ message: "Healthstats not found"});
        }

        if (healthstats.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized to delete this healthstat"});
        }

        await Healthstats.findByIdAndDelete(req.params.id);
        res.json({ message: "Healthstats delete successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};