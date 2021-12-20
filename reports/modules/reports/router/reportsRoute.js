

import express from "express";
import ReportsController from "../controller/reports.controller.js";
const router = express.Router();
router.use((req, res, next) => {
  console.log(
    `Incomming api reports : ${req.method}:${req.url} ${res.statusCode}`
  );
  next();
});
router.get("/:currency/:month?", ReportsController.getTransactions);


export default router;