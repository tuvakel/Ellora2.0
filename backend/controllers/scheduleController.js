const Schedule = require("../models/Schedule");

// POST /api/schedules
exports.createSchedule = async(req, res) => {
    const schedule = await Schedule.create({...req.body, userId: req.user.id});
    res.json(schedule);
};

//GET /api/schedules/all
exports.getAllSchedules = async(req, res) => {
    const schedules = await Schedule.find().populate("userId", "firstname lastname email");
    res.json(schedules);
};

//PUT /api/schedules/:id
exports.updateSchedule = async(re, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);

        if(!schedule) {
            return res.status(404).json({ message: "Schedule not found"});
        }

        //checking if user owns the schedule           
        if(schedule.userId.toString() !== req.user.id){
                return res.status(403).json({ message: "Not authorized to update this schedule"});
        }

        const updateSchedule = await Schedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        res.json(updateSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete /api/schedules/:id
exports.deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);

        if (!schedule){
            return res.status(404).json({ message: "Schedule not found"});
        }

        if (schedule.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized to delete this schedule"});
        }

        await Schedule.findByIdAndDelete(req.params.id);
        res.json({ message: "Schedule delete successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};