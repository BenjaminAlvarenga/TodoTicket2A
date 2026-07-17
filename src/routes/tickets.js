import ticketController from "../controllers/ticketController";
import express from "express";

const router = express.Router()

router.route("/")
.get(ticketController.get)

router.route("/buy")
.get(ticketController.post)

router.route("/update")
.get(ticketController.put)

router.route("/delete")
.get(ticketController.delete)

export default router