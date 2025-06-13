const shipsModel = require("../models/shipsModel");
const missionModel = require("../models/missionModel");
const mongoose = require("mongoose");


// exports.getAllPersonnel=async (req,res)=>{
//     try{
//     const datas = await personnelModel.find();
//     console.log(datas)
//     }catch(err){
//         console.error(err);
//         console.log("a")
//     }
//     res.render("homePage.ejs",datas);
// }
exports.renderAddM = async (req,res)=>{
    const ships = await shipsModel.find();
    res.render("addMission.ejs",{ships});
}




exports.addNewMission=async (req,res)=>{
    try{
        const shipId = new mongoose.Types.ObjectId(req.body.ships)
        console.log(req.body.ships);
        const newMission = await  new missionModel({
            name:req.body.name,
            purpose:req.body.purpose,
            destination:req.body.destination,
            ship:shipId
        })

        
        newMission.save();
        res.redirect("/");
    }catch(err){
        console.error(err);
    }
    
}
exports.deleteMission = async(req,res)=>{
    try {
        const deleted =await  missionModel.findByIdAndDelete(req.params.id);
        res.redirect("/")

    } catch (error) {
        console.log(error);
    }
}
exports.editMission = async(req,res)=>{
    try {
        const shipUpdate = shipsModel.findById(req.body.ship)
        const data = {
         name :req.body.name,
         purpose: req.body.purpose, 
         destination: req.body.destination ,
         ship:shipUpdate._id
        }
        const updated = await missionModel.findByIdAndUpdate(req.params.id,data);
        res.redirect("/")
    } catch(error) {
        
    }
}
exports.renderEditM=async(req,res)=>{
   try {
    const ships = await shipsModel.find();
    console.log("this is"+ships[0]);
    const oldData = await missionModel.findById(req.params.id);
    res.render("editMission.ejs",{data:oldData,ships});
   } catch (error) {
    console.log(error);
   } 
}
exports.getReport = async (req,res)=>{

    const report = await missionModel.aggregate([
        
        {
          $lookup: {
            from: "ships",
            localField: "ship",
            foreignField: "_id",
            as: "shipInfo"
          }
        },
        { $unwind: "$shipInfo" },
      
        {
          $lookup: {
            from: "personnels",
            localField: "shipInfo.crew",
            foreignField: "_id",
            as: "crewInfo"
          }
        },

        {
          $project: {
            missionName: "$name",
            destination: 1,
            purpose: 1,
            shipName: "$shipInfo.name",
           
            crew: {
              $map: {
                input: "$crewInfo",
                as: "member",
                in: {
                  name: "$$member.name",
                  serviceID: "$$member.serviceID"
                }
              }
            }
          }
        }
      ]);
    //   res.json(report)
      res.render("missionReport.ejs",{report})
    }      