const express = require("express");
const app = express();
const Schema = require("./Schema/createschema")
const connectdata = require("./Schema/connectdatabse")
const Booking = require("./Schema/bookingschema")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const port = 5000;
app.use(cors(origin = "*"))
const bodyparser = require("body-parser")
app.use(bodyparser.json())


// image upload


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
       cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null,newFileName)
    }
})


const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startWith('image/')){
        cb(null,true)
    }else{
        cb(new Error("only image are allowed", false))
    }
}
const upload = multer({
    storage : storage,
    fileFilter: fileFilter,
    limits : {
        fileSize: 1024 * 1024 * 6
    }
})

// login form start
app.get("/user", async (req, res) => {
    try {
        const datta = await Schema.find();
        res.json(datta)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})
app.get("/user/:id", async (req, res) => {
    try {
        const datta = await Schema.findOne({ "_id": req.params.id });
        res.json(datta)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.get("/user/:id", async (req, res) => {
    try {
        const datta = await Schema.findOne({ "_id": req.params.id });
        res.json(datta)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post("/user", upload.single('profileimg'),async (req, res) => {
    try {
        const mydata = new Schema();
        mydata.username = req.body.username;
        mydata.password = req.body.password;
        mydata.mobile = req.body.mobile;
        mydata.useremail = req.body.useremail;   
        mydata.DOB = req.body.DOB
        if(req.file){
         mydata.profileimg = req.file.filename;
        }
        const datavalue = await mydata.save()
        if (datavalue) {
            res.status(200).json({ message: "User created successfully" });//jab backend se msg dena ho/ya alert me dikhana ho post hone pr 
        } else {
            res.status(400).json({ message: "User created not successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})


app.patch("/user/:id", async (req, res) => {
    try {
        const datta = await Schema.findByIdAndUpdate(req.params.id, req.body);
        const updatedata = res.json({ "login": datta });
        if (updatedata) {
            res.status(200).json({
                message: "succefull data edit"
            })
        } else {
            res.status(404).json({ message: "User not edit" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.delete("/user/:id", async (req, res) => {
    try {
        const datta = await Schema.findByIdAndDelete(req.params.id)
        if (datta) {
            res.status(200).json({
                message: "succefully delete"
            })
        } else {
            res.status(404).json({ message: "User not delete" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})


app.get("/booking", async (req, res) => {
    try {
        const data = await Booking.find();
        res.json({ "userdetaile": data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.get("/booking/:id", async (req, res) => {
    try {
        const datta = await Booking.findOne({ "_id": req.params.id });
        res.json(datta)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post("/booking", async (req, res) => {
    try {
        const bkdata = new Booking();
        bkdata.username = req.body.username;
        bkdata.email = req.body.email;
        bkdata.time = req.body.time;
        bkdata.number = req.body.number;
        bkdata.msg = req.body.msg;
        const datavalue = await bkdata.save()
        if (datavalue) {
            res.status(200).json({ message: "User created successfully" });
        } else {
            res.status(404).json({ message: "User not post" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})



app.patch("/booking/:id", async (req, res) => {
    try {
        const datta = await Booking.findByIdAndUpdate(req.params.id, req.body);
        const updatedata = res.json({ "userdetaile": datta });
        if (updatedata) {
            res.status(200).json({
                message: "succefull data edit"
            })
        } else {
            res.status(404).json({ message: "User not edit" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.delete("/booking/:id", async (req, res) => {
    try {
        const datta = await Schema.findByIdAndDelete(req.params.id)
        if (datta) {
            res.status(200).json({
                message: "succefully delete"
            })
        } else {
            res.status(404).json({ message: "User not delete" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})
app.listen(port, (req, res) => {
    console.log("connect with server", port)
})

