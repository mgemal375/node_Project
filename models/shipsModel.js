const mongoose = require("mongoose");


const schema =  new mongoose.Schema(
    {
        name :{
            type:String,
            required:true
        },
        registryId :{
            type:String,
            required:true
        },
        missions :{
            type:[String],
            required:false
        },
        crew :{
            type:[{type: mongoose.Schema.Types.ObjectId, ref:'Personnel'}],
            required:false
        }
    }
)

const shipsModel = mongoose.model("Ships",schema);

module.exports = shipsModel;    