import clientController from "../controllers/clientsController";
import express from "express";

const router = express.Router()

router.route("/")
.post(clientController.register)

router.route("/login")
.post(clientController.login)

router.route("/logout")
.post(clientController.logout)

router.route("/verify")
.post(clientController.verify)

export default router