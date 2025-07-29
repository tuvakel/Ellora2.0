const express = require("express");
const { createAchievement, getAllAchievements, updateAchievement,deleteAchievement } = require("../controllers/achievementController");
const router = express.Router();

router.post("/", createAchievement);
router.get("/all", getAllAchievements);
router.put("/:id", updateAchievement);
router.delete("/:id", deleteAchievement);

module.exports = router;