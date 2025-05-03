const mongoose = require("mongoose");

const bookingschema = new mongoose.Schema({
    username : String,
    email : String,
    time : Date,
    number : Number,
    msg : String
})

const Modelbooking = mongoose.model("booking-restorant",bookingschema)

module.exports = Modelbooking;