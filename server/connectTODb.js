if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const mongoose = require ("mongoose");

async function connectToDb(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("COnectado a la Db");
    }
    catch(error){
        console.log("error al conectar");
    }
    
}

module.exports = connectToDb;
