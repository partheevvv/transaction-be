const mongoose = require("mongoose");

const dbConnect = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully")

    } catch (e) {

        console.error("Database connection failed", e);
        process.exit(1);

    }           
};

module.exports = dbConnect;