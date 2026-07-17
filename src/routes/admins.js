import adminController from "../controllers/adminController.js";
import express from "express";

const router = express.Router()

router.route("/")
.post(adminController.register)

router.route("/login")
.post(adminController.login)

router.route("/logout")
.post(adminController.logout)

router.route("/verify")
.post(adminController.verify)

export default router