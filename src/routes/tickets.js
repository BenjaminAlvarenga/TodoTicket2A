import ticketController from "../controllers/ticketController.js";
import express from "express";

const router = express.Router()

router.route("/")
.get(ticketController.get)

router.route("/buy")
.get(ticketController.post)

router.route("/:id")
.get(ticketController.put)
.get(ticketController.delete)

export default router