const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://pathanarbaj03328:arbaj97855@cluster0.2rqlvgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    family:4,
}).then(()=>{
    console.log("connect mongoose with mongodb")
}).catch(()=>{
    console.log("canoot connect mongoose with mongodb !")
})