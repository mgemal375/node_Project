const mongoose = require("mongoose");


const schema =  new mongoose.Schema(
    {
        name :{
            type:String,
            required:true
        },
        ship :{
            type:mongoose.Schema.Types.ObjectId, ref:"Ships",
            required:true
        },
        destination :{
            type:String,
            required:true
        },
        purpose :{
            type:String,
            required:true
        }
    }
)

const missionModel = mongoose.model("Mission",schema);

module.exports = missionModel;    