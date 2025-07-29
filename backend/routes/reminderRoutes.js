const express = require("express");
const { createReminder, getAllReminders, updateReminder, completeReminder, deleteReminder } = require("../controllers/reminderController");
const router = express.Router();

router.post("/", createReminder);
router.get("/all", getAllReminders);
router.put("/:id", updateReminder);
router.put("/:id", completeReminder);
router.delete("/:id", deleteReminder);

module.exports = router;