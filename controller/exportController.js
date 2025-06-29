const { Parser }   = require("json2csv");
const Transaction  = require("../models/Transaction");

exports.exportCsv = async (req, res, next) => {
    try {
    
        const userId = req.user.id;
        
        const txs = await Transaction.find({ 
            userId 
        }).sort({ 
            date: -1 
        });
      
        const fields = ['date','description','amount','category','type'];

        const parser = new Parser({ 
            fields 
        });

        const csv = parser.parse(txs.map(tx => ({
          date: tx.date.toISOString().split("T")[0],
          description: tx.description,
          amount: tx.amount,
          category: tx.category,
          type: tx.type
        })));
      
        res.header('Content-Type', 'text/csv');
        res.attachment('transactions.csv');

        res.send(csv);
      
    } catch (e) {
        next(e);
    }
};
