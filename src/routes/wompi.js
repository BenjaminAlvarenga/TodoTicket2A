import wompiController from "../controllers/wompiController.js";
import express from "express";

const router = express.Router()

router.route("/token")
.post(wompiController.generarToken)

router.route("/paymentTest")
.post(wompiController.paymentTest)

export default router