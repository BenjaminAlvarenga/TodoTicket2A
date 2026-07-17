import ticketController from "../controllers/ticketController.js";
import express from "express";
import { authValidation } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route("/")
.get(authValidation(["Admin"]),ticketController.getTickets)

router.route("/buy")
.post(ticketController.postTicket)

router.route("/:id")
.put(ticketController.putTicket)
.delete(authValidation(["Admin"]),ticketController.deleteTicket)

export default router