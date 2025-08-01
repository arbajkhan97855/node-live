const express = require("express");
const app = express();
const Schema = require("./Schema/createschema");
const connectdata = require("./Schema/connectdatabse");
const Booking = require("./Schema/bookingschema");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser");
const port = 5000;

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyparser.json());
app.use('/uploads', express.static('uploads'));

// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 6, // 6MB
    },
});

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



app.post("/user", upload.single('profileimg'), async (req, res) => {
    try {
        const newUser = new Schema(req.body);
        if (req.file) {
            newUser.profileimg = req.file.filename;
        }

        const savedUser = await newUser.save();
        if (savedUser) {
            res.status(200).json({ message: "User created successfully" });
        } else {
            res.status(400).json({ message: "Failed to create user" });
        }
    } catch (error) {
        console.error("Error in /user POST:", error.message);
        res.status(500).json({ message: error.message });
    }
});


app.patch("/user/:id",upload.single('profileimg'), async (req, res) => {
    try {
        const existinguser = await Schema.findById(req.params.id)
        if(req.file){
            if(existinguser.profileimg){
                const oldfilepath = path.join('./uploads', existinguser.profileimg)
                fs.unlink(oldfilepath,(err)=>{
                    if(err) console.log('failed to delete old image :', err)
                })
            }
            req.body.profileimg = req.file.filename
        }
        const datta = await Schema.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if (datta) {
          res.status(200).json({ message: "successfully updated", login: datta });
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
            if(datta.profileimg){
                const filepath = path.join('./uploads', datta.profileimg)
                fs.unlink(filepath,(err)=>{
                    if(err) console.log('failed to delete :', err)
                })
            }
            res.status(200).json({message: "succefully delete"})
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
        res.json(data)
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
        const bkdata = new Booking(req.body);
        const datavalue = await bkdata.save()
        if (datavalue) {
            res.status(200).json({ message: "Your booking successfully" });
        } else {
            res.status(404).json({ message: "Your booking not successfully, please try again " });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})



app.patch("/booking/:id", async (req, res) => {
    try {
        const datta = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });

if (datta) {
    res.status(200).json({ message: "Successfully updated", datta });
} else {
    res.status(404).json({ message: "Booking not found" });
}

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.delete("/booking/:id", async (req, res) => {
    try {
       const datta = await Booking.findByIdAndDelete(req.params.id)
        if (datta) {
            res.status(200).json({
                message: "succefully delete"
            })
        } else {
            res.status(404).json("User not delete");
        }
    } catch (error) {
        res.status(500).json(error.message)
    }

})
app.listen(port, (req, res) => {
    console.log("connect with server", port)
})

