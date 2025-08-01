const mongoose = require("mongoose")

const Schemas = new mongoose.Schema({
    username : String,
    password : String,
    mobile : Number,
    useremail : {type: String,unique: true,lowercase: true,trim: true},
    profileimg : String,
    DOB : Date
})

const modelschema = mongoose.model("restorant-data",Schemas)

module.exports = modelschema;
