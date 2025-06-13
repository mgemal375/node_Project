const express = require("express");
const app = express();
const db = require("./config/db.js");
app.use(express.urlencoded({ extended: true }));
const personnelRouter = require("./routes/personnelroutes.js")
const shipsRouter = require("./routes/shipsRoutes.js");
const missionsRouter = require("./routes/missionRoutes.js");
const PORT = 3000;
app.use(express.static('public'));

app.set("view engine","ejs")
require("dotenv").config();

// importing the models 

const personnelModel = require('./models/personnelModel.js');
const shipsModel = require('./models/shipsModel.js');
const missionModel=require('./models/missionModel.js');

// connect to the database/collection  
db.dbInit();

app.use("/api/personnel",personnelRouter)
app.use("/api/ships",shipsRouter)
app.use("/api/missions",missionsRouter)
// home page 
app.get("/",async function(req,res){
    try{
        const dataP = await personnelModel.find();
        //console.log(datas)
        const dataS = await shipsModel.find();
        // console.log(datas)
        const dataM = await missionModel.find();
        // const dataM= await personnelModel.find();
        // console.log(datas)
        res.render("homePage.ejs",{dataP,dataS,dataM});
        }catch(err){
            console.error(err);
            console.log("a")
            res.status(500).send("Something went wrong!");
        }
        //res.render("homePage.ejs",datas);
})


// //missions routes
// app.get("/api/missions",function(req,res){

// })
// app.post("/api/missions",function(req,res){
    
// })
// app.put("/api/missions/:id",function(req,res){
    
// })
// app.delete("/api/missions/:id",function(req,res){
    
// })

// //personel routes
// app.get("/api/personnel",function(req,res){

// })
// app.post("/api/personnel",function(req,res){
    
// })
// app.put("/api/perssonel/:id",function(req,res){
    
// })
// app.delete("/api/personnel/:id",function(req,res){
    
// })

// // ships routs
// app.get("/api/ships",function(req,res){

// })
// app.post("/api/ships",function(req,res){
    
// })
// app.put("/api/ships/:id",function(req,res){
    
// })
// app.delete("/api/ships/:id",function(req,res){
    
// })




//listening to the specified PORT 
app.listen(PORT ,function(){

    console.log(`server running on port ${PORT}`);
})
