const Reminder = require("../models/Reminder");

//POST /api/reminders
exports.createReminder = async(req, res) => {
    const reminder = await Reminder.create({ ...req.body, userId: req.user.id});
    res.json(reminder);
};

//GET /api/reminders/all
exports.getAllReminders = async(req, res) => {
    const reminders = await Reminder.find().populate("userId", "firstname lastname email");
    res.json(reminders);
};

//PUT /api/reminders/:id
exports.updateReminder = async(req, res)=>{ 
    try {
       const reminder =await Reminder.findById(req.params.id);
       
       if(!reminder) {
        return res.status(404).json({ message: "Reminder not found"});
       }

       if(reminder.userId.toString() !== req.user.id){
        return res.status(403).json({message: "NOt authorized to update reminder"});
       }

       const updateReminder = await Reminder.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true}
       );

       res.json(updateReminder);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

//PUT /api/reminders/:id/complete
exports.completeReminder = async (req, res)=> {
    try {
        const reminder = await Reminder.findById(req.params.id);

        if(!reminder){
            return res.status(404).json({ message: "Reminder not found"});
        }

        if(reminder.userId.toString() !== req.user.id){
            return res.status(403).json({ messsage: "Not authorized to complete reminder"});
        }

        reminder.completed = true;
        await reminder.save();

        res.json(completedReminder);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

//DELETE /api/reminders/:id
exports.deleteReminder = async(req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);

        if (!reminder){
            return res.status(404).json({ message: "Reminder not found"});
        }

        if (reminder.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "NOt authorized to delete this reminder"});
        }

        await Reminder.findByIdAndDelete(req.params.id);
        res.json({message: "Reminder deleted"});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};