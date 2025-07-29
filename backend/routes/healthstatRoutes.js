const express = require("express");
const { createHealthstats, getAllHealthstats, updateHealthstats,deleteHealthstats } = require("../controllers/healthstatsController");
const router = express.Router();

router.post("/", createHealthstats);
router.get("/all", getAllHealthstats);
router.put("/:id", updateHealthstats);
router.delete("/:id", deleteHealthstats);

module.exports = router;