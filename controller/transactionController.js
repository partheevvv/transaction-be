const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res, next) => {

    try{
        const transaction = await Transaction.create({
            userId: req.user.id,
            ...req.body
        });
        res.status(201).json(
            transaction
        )
    } catch(e) {
        next(e);
    }
}

exports.getTransaction = async (req, res, next) => {
    const userId = req.user.id;

    const filter = {
        userId
    }


    if (req.query.startDate || req.query.endDate) {
        filter.date = {};
        if (req.query.startDate) {
            filter.date.$gte = new Date(req.query.startDate);
        }
        if (req.query.endDate) {
            filter.date.$lte = new Date(req.query.endDate);
        }
    } 

    if (req.query.category) {
        filter.category = req.query.category;
    }

    if (req.query.description) {
        filter.description = req.query.description;
    }

    try{
        const transactions = await Transaction
        .find(
            filter
        ).collation({
            locale: "en", strength: 2
        }).sort({
            date: -1
        });

        res.json(
            transactions
        )

    } catch(e) {
        next(e);
    }
}

exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })

        if(!transaction) return res.status(404).json({
            message: "Transaction not found"
        })

        res.json({
            message: "Transaction is deleted"
        })
    } catch (e) {
        
        next(e);
    }
}


exports.updateTransaction = async (req, res, next) => {
    
    try {
        const {
            date,
            description,
            amount,
            category,
            type
        } = req.body;

        const updates = {};

        if (date !== undefined) updates.date = date;
        if (description !== undefined) updates.description = description;
        if (amount !== undefined) updates.amount = amount;
        if (category !== undefined) updates.category = category;
        if (type !== undefined) updates.type = type;

        
        const transaction = await Transaction.findOneAndUpdate({
                _id: req.params.id,
                userId: req.user.id
            }, 
            updates,
            {
                new: true
            }
        );

        if (!transaction) { 
            return res.status(404).json({
                message: "Transaction not found"
            })
        }

        res.json({
            message: "Transaction has been updated successfully", transaction
        })
    } catch(e) {
        next(e);
    }
}