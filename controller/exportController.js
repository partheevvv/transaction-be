const { Parser }   = require("json2csv");
const Transaction  = require("../models/Transaction");

exports.exportCsv = async (req, res, next) => {
    try {
    
        const userId = req.user.id;
        
        const transactions = await Transaction.find({ 
            userId 
        }).sort({ 
            date: -1 
        });
      
        const fields = ['date','description','amount','category','type'];

        const parser = new Parser({ 
            fields 
        });

        const csv = parser.parse(transactions.map(transaction => ({
          date: transaction.date.toISOString().split("T")[0],
          description: transaction.description,
          amount: transaction.amount,
          category: transaction.category,
          type: transaction.type
        })));
      
        res.header('Content-Type', 'text/csv');
        res.attachment('transactions.csv');

        res.send(csv);
      
    } catch (e) {
        next(e);
    }
};
