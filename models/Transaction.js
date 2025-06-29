const mongoose = require("mongoose")
const { model, Schema } = require("mongoose")

const transactionSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User', required: true
    },
    date: {
        type: Date, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String, 
        enum: ["Income", "Expense"], 
        require: true
    },
    },  
    { timestamps: true }
);

module.exports = model("Transaction", transactionSchema);
