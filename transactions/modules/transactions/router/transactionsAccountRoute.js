

import express from "express";
import TransactionEntryController from "../controller/transactions.controller.js";
const router = express.Router();
// Log middleware
router.use((req, res, next) => {
  console.log(
    `Incomming api in transactions route : ${req.method}:${req.url} ${res.statusCode}`
  );
  next();
});
router.post("/", TransactionEntryController.insertTransactions);


export default router;