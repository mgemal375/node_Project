const mongoose = require("mongoose");

async function dbInit(){

    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("Connected to the DB");

}

module.exports = {
    dbInit
};