const express = require("express");
const app = express();
const Schema = require("./Schema/createschema")
const connectdata = require("./Schema/connectdatabse")
const Booking = require("./Schema/bookingschema")
const cors = require("cors")
const port = 5000;
app.use(cors(origin = "*"))
const bodyparser = require("body-parser")
app.use(bodyparser.json())


app.get("/",(req,res)=>{
    res.send("hello nodejs")
})

// login form start
app.post("/postdata",async(req,res)=>{
    const mydata = new Schema();
    mydata.username = req.body.username;
    mydata.password = req.body.password;
    mydata.mobile = req.body.mobile;
    mydata.useremail = req.body.useremail;
    mydata.profileimg = req.body.profileimg;
    mydata.DOB = req.body.DOB

    const datavalue = await mydata.save()
    if(datavalue){
        console.log(`successfull post data for ${mydata.username}`)
        res.status(200).json({ message: "User created successfully" });//jab backend se msg dena ho/ya alert me dikhana ho post hone pr 
    }else{
        console.log("cannot successfull post data")
    }
})

app.get("/postdata",async(req,res)=>{
    const datta = await Schema.find();
    res.send({"login":datta})
})
app.get("/postdata/:id",async(req,res)=>{
    const datta = await Schema.findOne({"_id" : req.params.id});
    res.send(datta)
})

app.patch("/postdata/:id", async (req, res) => {
    const datta = await Schema.findByIdAndUpdate(req.params.id, req.body);
    const updatedata = res.send({"login" : datta});
    if(updatedata){
        res.status(200).json({
            message : "succefull data edit"
        })
    }
})

// app.post("/postdata", (req, res) => {
//     // Save to database, then:
//     res.status(200).json({ message: "User created successfully" });
// });
// login form end

app.post("/booking",async(req,res)=>{
    const bkdata = new Booking();
    bkdata.username = req.body.username;
    bkdata.email = req.body.email;
    bkdata.time = req.body.time;
    bkdata.number = req.body.number;
    bkdata.msg = req.body.msg;
    const datavalue = await bkdata.save()
    if(datavalue){
        console.log(`successfull post data for ${bkdata.username}`)
    }else{
        console.log("cannot successfull post data")
    }
})

app.get("/booking", async(req,res)=>{
    const data = await Booking.find();
    res.send({"userdetaile" : data})
})
app.listen(port,(req,res)=>{
    console.log("connect with server",port)
})

