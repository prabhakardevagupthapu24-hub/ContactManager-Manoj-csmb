const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    profileImage: {
        type: String,
        default: ""
    },
});
module.exports = mongoose.model("Contact", contactSchema);