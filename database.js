import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.uri);
const connection = mongoose.connection

connection.once("open", () => {
    console.log("MongoDB is connected")
})