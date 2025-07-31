const express = require("express");
const app = express();
const Schema = require("./Schema/createschema")
const connectdata = require("./Schema/connectdatabse")
const Booking = require("./Schema/bookingschema")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
app.use('/uploads', express.static('uploads'));
const port = 5000;
app.use(cors({ origin: '*' }))
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
  if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error("only image are allowed"))
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
        res.status(500).send(error.message)
    }

})
app.get("/user/:id", async (req, res) => {
    try {
        const datta = await Schema.findOne({ "_id": req.params.id });
        res.json(datta)
    } catch (error) {
        res.status(500).send(error.message)
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
            res.status(200).send("User created successfully" );//jab backend se msg dena ho/ya alert me dikhana ho post hone pr 
        } else {
            res.status(400).send("User created not successfully")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})


app.patch("/user/:id", async (req, res) => {
    try {
        const datta = await Schema.findByIdAndUpdate(req.params.id, req.body);
        const updata = res.json({login: datta})
        if (datta) {
          res.status(200).send("successfully updated",);
         } else {
        res.status(404).send("User not edit");
         }

    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.delete("/user/:id", async (req, res) => {
    try {
        const datta = await Schema.findByIdAndDelete(req.params.id)
        if (datta) {
            res.status(200).send("succefully delete")
        } else {
            res.status(404).send("User not delete");
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})


app.get("/booking", async (req, res) => {
    try {
        const data = await Booking.find();
        res.json({ "userdetaile": data })
    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.get("/booking/:id", async (req, res) => {
    try {
        const datta = await Booking.findOne({ "_id": req.params.id });
        res.json(datta)
    } catch (error) {
        res.status(500).send(error.message )
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
            res.status(200).send("User created successfully");
        } else {
            res.status(404).send("User not post");
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})



app.patch("/booking/:id", async (req, res) => {
    try {
        const datta = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const updata = res.json({"userdetaile": datta})
if (updata) {
    res.status(200).send("Successfully updated");
} else {
    res.status(404).send("Booking not found");
}

    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.delete("/booking/:id", async (req, res) => {
    try {
       const datta = await Booking.findByIdAndDelete(req.params.id)
        if (datta) {
            res.status(200).send(
            "succefully delete"
            )
        } else {
            res.status(404).send("User not delete");
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})
app.listen(port, (req, res) => {
    console.log("connect with server", port)
})

