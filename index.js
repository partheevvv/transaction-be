const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const helmet = require("helmet");

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(',');
  
const corsOptions = {

    origin: (origin, callback) => {
    
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: No access from ${origin}`));
        }
    },

    methods: ['GET','HEAD','POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,       
    optionsSuccessStatus: 200
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());



app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/summary", require("./routes/summary"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/user", require("./routes/user"));
app.use("/api/export", require("./routes/export"));

app.use((err, req, res, next) => {
    
    if (err.message.startsWith('CORS policy')) {
        return res.status(403).json({ message: err.message });
    }
    
    console.error(err.stack);
    
    res.status(500).json({
        message: err.message
    })
});

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`)
    }
);
