const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/restorant-databse",{
    family:4
}).then(()=>{
    console.log("connect mongoose with mongodb")
}).catch(()=>{
    console.log("canoot connect mongoose with mongodb !")
})