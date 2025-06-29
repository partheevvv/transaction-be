const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const helmet = require("helmet");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());



app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/summary", require("./routes/summary"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/user", require("./routes/user"));
app.use("/api/export", require("./routes/export"));

app.use((err, req, res, next) => {
    
    console.error(err.stack);
    
    res.status(500).json({
        message: err.message
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
    }
);
