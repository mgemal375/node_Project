const express = require("express");
const router= express.Router();
const shipsController =require("../controllers/shipsController");


//router.get("/",shipsController.getAllPersonnel);

router.get("/add",shipsController.renderAddS);
router.post("/add",shipsController.addNewShip);

router.post("/:id/delete",shipsController.deletship)
router.post("/:id/edit",shipsController.editPersonel)
router.get("/:id/edit",shipsController.renderEditP)

module.exports = router;