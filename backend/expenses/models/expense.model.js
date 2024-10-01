import User from '../../libs/userModel.db.js';

export const add = async (req) => {
    try {
        // parse the inputs
        const { _id, amount, category } = req.body;

        // check if the required parameters are present
        if (!_id || !amount || !category) {
            throw new Error('Missing required parameters');
        }

        // add the expense
        const newExpense = {
            amount,
            category
        };

        // find the user
        const user = await User.findById(_id);

        if (!user) {
            throw new Error('No user found.');
        }

        // add the expense to the spending
        user.spending += amount;

        // check if the spending is more than the budget
        if (user.spending > user.budget) {
            console.log('Warning: Spending amount exceeding the budget');
        }

        // add expense to the user expenses
        user.expenses.push(newExpense);

        await user.save();

        return { user };
    } catch (error) {
        console.error("Error in adding expense:", error);
    }
};

export const update = async (req) => {
    try {
        // parse the req body
        const { _id, budget, month, expenses, expenseNumber } = req.body;

        // check if the user is valid user
        const user = await User.findById(_id);

        if (!user) {
            throw new Error('No user found.');
        }

        // update the attributes based on the request body
        if (budget) {
            user.budget = budget;
        }

        if (month) {
            user.month = month;
        }

        // get the expense id from the user
        const expense = user.expenses[expenseNumber];

        // check if the expense id is valid
        if (!expense) {
            throw new Error('No expense found.');
        }

        if (expenses && typeof(expenses) === 'object') { 
            const { amount, category } = expenses;

            if (!amount || !category) {
                throw new Error('Missing amount and category parameters');
            }

            const oldAmount = expense.amount;
            
            user.spending -= oldAmount;
            user.spending += amount;

            if (user.spending > user.budget) {
                console.log('Warning: Spending amount exceeding the budget');
            }

            await User.findOneAndUpdate(
                {
                    _id: _id,
                    'expenses._id': expense._id
                },
                {
                    $set: {'expenses.$': expenses}
                },
                {
                    new: true
                }
            );
        }

        await user.save();

        return { user };
    } catch (error) {
        console.error("Error in updating expense:", error);
    }

};

export const del = async (req) => {

    try {
        const { _id, expenseNumber } = req.body;

        // check if the user is valid user
        let updatedExpenseUser = await User.findById(_id);

        if (!updatedExpenseUser) {
            throw new Error('No user found.');
        }

        // get the expense from the expenses array of the user
        const expense = updatedExpenseUser.expenses[expenseNumber];

        // check if the expense id is valid
        if (!expense) {
            throw new Error('No expense found.');
        }

        // delete the amount from the spending
        const oldAmount = expense.amount;

        updatedExpenseUser.spending -= oldAmount;

        // remove the expense from the user
        await User.findByIdAndUpdate(
            _id,
            {
                $pull: { expenses: {_id: expense._id} }
            },
            {
                new: true
            }
        );

        await updatedExpenseUser.save();
        
        return updatedExpenseUser;
    } catch (error) {
        console.error("Error in deleting expense:", error);
    }


};

export const view = async (req) => {

    try {
        // get the user id
        const { _id } = req.body;

        // get the user
        const user = await User.findById(_id);
    
        // check if the user is valid
        if (!user) {
            throw new Error('No user found.');
        }
    
        // get the expenses array
        const expenses = user.expenses;

        return expenses;
    } catch (error) {
        console.error("Error in displaying expenses:", error);
    }
};

export const summary = async (req) => {

    try {
        // get the user id
        const { _id } = req.body;

        // get the user
        const user = await User.findById(_id);
    
        // check if user is valid
        if (!user) {
            throw new Error('No user found');
        }
    
        const expenseSummary = user.spending;
    
        if (!expenseSummary) {
            throw new Error('Error in getting the spending attribute');
        }
    
        return expenseSummary;
    } catch (error) {
        console.error("Error in displaying expenses summary:", error);
    }

};

export const monthExpense = async (req) => {
    try {
        // get the month from the user
        const { month } = req.body;

        // check if month is valid
        if (!month) {
            throw new Error('no month fetched.');
        }

        // get the document based on the month
        const user = await User.findOne({ month: month });

        // check if the user is valid
        if (!user) {
            throw new Error('no user fetched.');
        }

        const expenses = user.expenses;

        if (!expenses) {
            throw new Error('no expenses fetched.');
        }

        return expenses;
    } catch (error) {
        console.error("Error in displaying monthly expenses:", error);
    }
};

