const express = require("express");
const router= express.Router();
const personelController =require("../controllers/personnelController");


// router.get("/",personelController.getAllPersonnel);

router.get("/add",personelController.renderAddP);
router.post("/add",personelController.addNewPersonnel);

router.post("/:id/delete",personelController.deletPersonnel)
router.post("/:id/edit",personelController.editPersonel)
router.get("/:id/edit",personelController.renderEditP)

module.exports = router;