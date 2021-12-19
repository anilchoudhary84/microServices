

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




/**
 * @swagger
 * /verify:
 *  get:
 *    summary: Verify token
 *    parameters:
 *      - in: header
 *        name: token
 *        description: Use token  to verify token
 *        required: true 
 *    responses:
 *      '200':
 *        description: token verification Success
 */
router.get("/verify", AuthService.isAuthenticated, AuthController.verify);


export default router;