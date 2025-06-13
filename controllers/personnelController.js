const personnelModel = require("../models/personnelModel");
const shipsModel = require("../models/shipsModel");
const mongoose = require("mongoose");


exports.getAllPersonnel=async (req,res)=>{
    try{
    const datas = await personnelModel.find();
    console.log(datas)
    }catch(err){
        console.error(err);
        console.log("a")
    }
    res.render("homePage.ejs",datas);
}
exports.renderAddP = async (req,res)=>{
    const ships = await shipsModel.find();
    res.render("addPersonel.ejs",{ships});
}

exports.addNewPersonnel=async (req,res)=>{
    try{
        const shipId = new mongoose.Types.ObjectId(req.body.ships)
        const newPersonnel = await  new personnelModel({
            name:req.body.name,
            serviceID:req.body.serviceID,
            specialities:req.body.specialities,
            doe:req.body.doe,
            ship:shipId
        })

        const updateShip = await shipsModel.findByIdAndUpdate(shipId,{
            $push:{crew:newPersonnel._id}
        });
        newPersonnel.save();
    }catch(err){
        console.error(err);
    }
    res.redirect("/");
}
exports.deletPersonnel = async(req,res)=>{
    try {
        const deleted =await  personnelModel.findByIdAndDelete(req.params.id);
        res.redirect("/")

    } catch (error) {
        console.log(error);
    }
}
exports.editPersonel = async(req,res)=>{
    try {
        const shipId = new mongoose.Types.ObjectId(req.body.ship)
        const data = {
         name :req.body.name,
         doe: req.body.doe, 
         serviceId: req.body.serviceId ,
         speciality:req.body.speciality,
         ship:shipId
        }
        const updated = await personnelModel.findByIdAndUpdate(req.params.id,data);
        const shipUpdate = await shipsModel.findByIdAndUpdate(shipId,{
            $push:{crew:updated._id}
        })
        res.redirect("/")
    } catch(error) {
        
    }
}
exports.renderEditP=async(req,res)=>{
   try {
    const ships = await shipsModel.find();
    console.log("this is"+ships[0]);
    const oldData = await personnelModel.findById(req.params.id);
    res.render("editePersonnel.ejs",{data:oldData,ships});
   } catch (error) {
    console.log(error);
   } 
}