import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import adminRoutes from "./src/routes/admins.js"
import clientsRoutes from "./src/routes/clients.js"
import ticketsRoutes from "./src/routes/tickets.js"
import wompiRoutes from "./src/routes/wompi.js"


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5274"],
    credentials: true
}))

app.use("/api/clients", clientsRoutes)
app.use("/api/admins", adminRoutes)
app.use("/api/tickets", ticketsRoutes)
app.use("/api/wompi", wompiRoutes)


export default app