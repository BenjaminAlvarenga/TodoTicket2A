import app from "./app";
import "./database.js"
import { config } from "./config.js";

async function main(){
    app.listen(config.server.port)
    console.log(`Server running in ${config.server.port}`)
}

main();