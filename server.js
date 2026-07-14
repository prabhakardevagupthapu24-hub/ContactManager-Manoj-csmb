const express = require("express");
const upload = require("./config/multer");
const connectDB = require("./config/db");
const Contact = require("./models/Contacts");
const cors = require("cors");
const app = express();
const path = require("path");
connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = 5000;
app.get("/", (req, res) => {
    res.send("Contact Manager Backend is Running...");
});
app.post("/contacts", upload.single("profileImage"), async (req, res) => {
    try {
        const contact = new Contact({
            ...req.body,
            profileImage: req.file
                ? `/uploads/${req.file.filename}`
                : ""
        });
        await contact.save();
        res.status(201).json({
            message: "Contact Saved Successfully",
            contact
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.delete("/contacts/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Contact Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.put("/contacts/:id", upload.single("profileImage"), async (req, res) => {
    try {
        const updatedData = {
            ...req.body
        };
        if (req.file) {
            updatedData.profileImage = `/uploads/${req.file.filename}`;
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );
        res.status(200).json({
            message: "Contact Updated Successfully",
            updatedContact
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.get("/contacts/search/:name", async (req, res) => {
    try {
        const contacts = await Contact.find({
            name: {
                $regex: req.params.name,
                $options: "i"
            }
        });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.get("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});