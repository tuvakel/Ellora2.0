const Goal = require("../models/Goal");

// POST /api/goals
exports.createGoal = async(req, res) => {
    const goal = await Goal.create({...req.body, userId: req.user.id});
    res.json(goal);
};

//GET /api/goals/all
exports.getAllGoals = async(req, res) => {
    const goals = await Goal.find().populate("userId", "firstname lastname email");
    res.json(goals);
};

//PUT /api/goals/:id
exports.updateGoal = async(re, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if(!goal) {
            return res.status(404).json({ message: "Goal not found"});
        }

        //checking if user owns the goal           
        if(goal.userId.toString() !== req.user.id){
                return res.status(403).json({ message: "Not authorized to update this goal"});
        }

        const updateGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        res.json(updateGoal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//PUT /api/goals/:id/complete
exports.completeGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if(!goal){
            return res.status(404).json({ message: "GOal not found"});
        }

        if (goal.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to complete this goal"});
        }

        goal.completed = true;
        await goal.save();

        res.json(completeGoal);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

//Delete /api/goals/:id
exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal){
            return res.status(404).json({ message: "Goal not found"});
        }

        if (goal.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized to delete this goal"});
        }

        await Goal.findByIdAndDelete(req.params.id);
        res.json({ message: "Goal delete successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};