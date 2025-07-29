const express = require("express");
const { createHealthtip, getAllHealthtips, updateHealthtip,deleteHealthtip } = require("../controllers/healthtipsController");
const router = express.Router();

router.post("/", createHealthtip);
router.get("/all", getAllHealthtips);
router.put("/:id", updateHealthtip);
router.delete("/:id", deleteHealthtip);

module.exports = router;