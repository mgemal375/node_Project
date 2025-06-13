const mongoose = require("mongoose");


const schema =  new mongoose.Schema(
    {
        name :{
            type:String,
            required:true
        },
        serviceID :{
            type:String,
            required:true
        },
        doe :{
            type:Date,
            required:true
        },
        specialities :{
            type:[String],
            required:true
        }
        ,ship:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Ships',
            required:false
        }
    }
)

const personnelModel = mongoose.model("Personnel",schema);

module.exports = personnelModel;