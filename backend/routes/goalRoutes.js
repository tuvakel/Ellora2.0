const express = require("express");
const { createGoal, getAllGoals, updateGoal,completeGoal,deleteGoal } = require("../controllers/goalController");
const router = express.Router();

router.post("/", createGoal);
router.get("/all", getAllGoals);
router.put("/:id", updateGoal);
router.put("/:id", completeGoal);
router.delete("/:id", deleteGoal);

module.exports = router;