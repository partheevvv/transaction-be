const Transaction = require("../models/Transaction")
const mongoose = require("mongoose")

exports.getSummary = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId.createFromHexString(req.user.id);
    
    const month = parseInt(req.query.month, 10) || new Date().getMonth() + 1;
    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    
    const results = await Transaction.aggregate([
      {
        $match: {
          userId,
          date: { 
            $gte: startDate, 
            $lte: endDate 
          }
        }
      },
      { 
        $group: 
        { _id: "$type", 
          total: { $sum: "$amount" } 
        } 
      }
    ]);

    let totalIncome=0, totalExpense=0;

    results.forEach(t => {
      if (t._id === "Income") totalIncome  = t.total; 
      if (t._id === "Expense") totalExpense = t.total; 
    });

    const balance = totalIncome - totalExpense;      
    const recent = await Transaction.find({ userId })
        .sort({ date: -1 })                           
        .limit(5)                                     
        .select("-__v -userId");                      

    res.json({ 
        balance, 
        totalIncome, 
        totalExpense, 
        recentTransactions: recent 
    });

  } catch (e) {
      next(e);                                 
  } 
};
