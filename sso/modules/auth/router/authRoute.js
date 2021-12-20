

import express from "express";
import AuthController from "../controller/auth.controller.js";
import AuthService from "../service/auth.service.js";
const router = express.Router();




router.use((req, res, next) => {
  console.log(
    `Incomming api in sso route : ${req.method}:${req.url} ${res.statusCode}`
  );
  next();
});
router.post("/login", AuthController.login);
router.post("/add", AuthController.add);
router.get("/verify", AuthService.isAuthenticated, AuthController.verify);


export default router;