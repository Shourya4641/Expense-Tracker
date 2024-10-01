import { add, update, del, view, summary, monthExpense } from "../models/expense.model.js";
export const addExpense = async (req, res) => {
    try {
        const response = await add(req);

        res.status(201).json({ message: 'Expense added successfully', response });
    } catch (error) {
        console.log('error in adding expense:' + error.message);
        res.status(500).json({message: 'internal server-error'});
    }
};

export const updateExpense = async (req, res) => {
    try {
        const response = await update(req);

        res.status(201).json({ message: 'Expense updated successfully', response });
    } catch (error) {
        console.log('error in updating expense:' + error.message);
        res.status(500).json({message: 'internal server-error'});
    }
};

export const deleteExpense = async(req, res) => {
    try {
        const response = await del(req);

        res.status(201).json({ message: 'Expense deleted successfully', response });
    } catch (error) {
        console.log('error in deleting expense:' + error.message);
        res.status(500).json({message: 'internal server-error'});
    }
}; 

export const viewAll = async (req, res) => {
    try {
        const response = await view(req);

        res.status(201).json({ message: 'Expense fetched successfully', response });
    } catch (error) {
        console.log('error in viewing expense:' + error.message);
        res.status(500).json({message: 'internal server-error'});
    }
};

export const getSummary = async (req, res) => {
    try {
        const response = await summary(req);

        res.status(201).json({ message: 'Summary fetched successfully', response });    
    } catch (error) {
        console.log('error in viewing expense summary:' + error.message);
        res.status(500).json({message: 'internal server-error'});
    }
};

export const getMonthExpense = async (req, res) => {
    try {
        const response = await monthExpense(req);

        res.status(201).json({ message: 'Monthly expense fetched successfully', response });
    } catch (error) {
        console.log('error in viewing monthly expense:' + error.message);
        res.status(500).json({message: 'internal server-error'});
    }
};