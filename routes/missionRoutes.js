const express = require("express");
const router= express.Router();
const missionController =require("../controllers/missionController");


//router.get("/",shipsController.getAllPersonnel);

router.get("/add",missionController.renderAddM);
router.post("/add",missionController.addNewMission);

router.post("/:id/delete",missionController.deleteMission)
router.post("/:id/edit",missionController.editMission)
router.get("/:id/edit",missionController.renderEditM)
router.get("/report",missionController.getReport)

module.exports = router;