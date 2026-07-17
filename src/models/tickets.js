/**
 * customerId
 * quantity
 * purchaseDate
 * total
 * paymentStatus
 * tansactionId
*/

import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    customerId: {type: Schema.Types.ObjectId, ref: "Clients"},
    quantity:{type:Number},
    purchaseDate: {type:Date},
    total:{type: Number},
    paymentStatus:{type: String},
    transactionId: {type: String}
})

export default model("Tickets", ticketSchema)