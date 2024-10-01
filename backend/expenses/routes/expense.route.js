import express from "express";

import { addExpense, updateExpense, deleteExpense, viewAll, getSummary, getMonthExpense } from "../controllers/expense.controller.js";

const router = express.Router();

router.post('/addExpense', addExpense);
router.put('/updateExpense', updateExpense);
router.put('/deleteExpense', deleteExpense);
router.get('/viewAll', viewAll);
router.get('/getSummary', getSummary);
router.get('/monthExpense', getMonthExpense);

export default router;