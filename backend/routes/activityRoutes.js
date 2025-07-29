const express = require("express");
const { createActivity, getAllActivities, updateActivity,deleteActivity } = require("../controllers/activityController");
const router = express.Router();

router.post("/", createActivity);
router.get("/all", getAllActivities);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;