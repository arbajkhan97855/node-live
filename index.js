const express = require("express");
const app = express();
const connectdata = require("./Schema/connectdatabse");
const Booking = require("./Schema/bookingschema");
const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
const port = 5000;
// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyparser.json());
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

