const { default: mongoose } = require("mongoose");
const personnelModel = require("../models/personnelModel");
const shipsModel = require("../models/shipsModel");


exports.renderAddS = async (req,res)=>{
    res.render("addships.ejs");
}
exports.addNewShip=async (req,res)=>{
    try{
        console.log("this is inside ships")
        const newShip = await  new shipsModel(req.body)
        newShip.save();
    }catch(err){
        console.error(err);
    }
    res.redirect("/");
}
exports.deletship= async (req,res)=>{
    try {
      const personnelUpdate = await personnelModel.find({ship:new mongoose.Types.ObjectId(req.params.id)})
      personnelUpdate.forEach(async (person)=>{
          await personnelModel.findByIdAndUpdate(person._id,{
            $set:  {ship:null}
          })
          console.log("ein in "+req.params.id)
      })
        const deleted =await  shipsModel.findByIdAndDelete(req.params.id);
        
        res.redirect("/")

    } catch (error) {
        console.log(error);
    }

}
exports.renderEditP=async (req,res)=>{
    try {
        const oldData = await shipsModel.findById(req.params.id);
        res.render("editeShip.ejs",{data:oldData,});
       } catch (error) {
        console.log(error);
       } 

}
exports.editPersonel=async (req,res)=>{
    try {
        const data = {
         name :req.body.name, 
         registryId: req.body.registryId ,
        }
        const updated = await shipsModel.findByIdAndUpdate(req.params.id,data);
        res.redirect("/")
    } catch(error) {
        
    }

}

