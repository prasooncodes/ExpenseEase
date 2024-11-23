const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body
    const userId = req.user._id  // Get the user ID from authenticated request

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user: userId  // Associate the expense with the user
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await expense.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(expense)
}

exports.getExpense = async (req, res) =>{
    try {
        const userId = req.user._id  // Get the user ID from authenticated request
        // Only fetch expenses for the specific user
        const expenses = await ExpenseSchema.find({ user: userId }).sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    const userId = req.user._id;  // Get the user ID from authenticated request

    try {
        // Find expense that belongs to the specific user
        const expense = await ExpenseSchema.findOne({ _id: id, user: userId });
        
        if (!expense) {
            return res.status(404).json({message: 'Expense not found or unauthorized'});
        }

        await expense.remove();
        res.status(200).json({message: 'Expense Deleted'})
    } catch (err) {
        res.status(500).json({message: 'Server Error'})
    }
}