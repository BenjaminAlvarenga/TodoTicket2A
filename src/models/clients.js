/**
 * name
 * lastname
 * email
 * password
 * isVerified
 * loginAttempts
 * timeout
 */

import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    name:{type: String},
    lastName: {type:String},
    email:{type: String},
    password: {type: String},
    isVerified: {type: String},
    loginAttempts: {type: Number},
    timeout: {type: Date}
})

export default model("Clients", clientSchema)