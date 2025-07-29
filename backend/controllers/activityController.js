const Activity = require("../models/Activity");

// POST /api/activitys
exports.createActivity = async(req, res) => {
    const activity = await Activity.create({...req.body, userId: req.user.id});
    res.json(activity);
};

//GET /api/activitys/all
exports.getAllActivities = async(req, res) => {
    const activities = await Activity.find().populate("userId", "firstname lastname email");
    res.json(activities);
};

//PUT /api/activity/:id
exports.updateActivity = async(re, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if(!activity) {
            return res.status(404).json({ message: "Activity not found"});
        }

        //checking if user owns the activity           
        if(activity.userId.toString() !== req.user.id){
                return res.status(403).json({ message: "Not authorized to update this activity"});
        }

        const updateActivity = await Activity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        res.json(updateActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete /api/activity/:id
exports.deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (!activity){
            return res.status(404).json({ message: "Activity not found"});
        }

        if (activity.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized to delete this activity"});
        }

        await Activity.findByIdAndDelete(req.params.id);
        res.json({ message: "Activity delete successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};