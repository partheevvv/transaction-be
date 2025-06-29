const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

exports.getCategorySummary = async (req, res, next) => {

    try {

        const userId = new mongoose.Types.ObjectId(req.user.id);
        
        const month  = parseInt(req.query.month, 10) || (new Date()).getMonth() + 1;
        const year   = parseInt(req.query.year, 10)  || (new Date()).getFullYear();

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const summary = await Transaction.aggregate([
            {
                $match: {
                    userId,
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            }, {
                $group: {
                    _id: "$category",
                    total: { 
                        $sum: "$amount"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    total: 1
                }
            }
        ]);

        res.json(summary);
    } catch (e) {
        next(e)
    }
}