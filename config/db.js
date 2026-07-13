const mongoose = require("mongoose");
const dns = required("dns")
dns.setServers(["8.8.8.8","8.8.4.4"])
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://adariadithya816_db_user:adithya@9059@cluster0.qfimjmp.mongodb.net/Contactmanager");
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
