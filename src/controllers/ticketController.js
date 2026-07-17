import ticketsModal from "../models/tickets.js";

const ticketController = {};

ticketController.getTickets = async (req, res) => {
  try {
    const tickets = await ticketsModal.find();
    return res.status(200).json(tickets);
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

ticketController.postTicket = async (req, res) => {
  try {
    const {
      customerId,
      quantity,
      purchaseDate,
      total,
      paymentStatus,
      transactionId,
    } = req.body;

    const transactionExists = await ticketsModal.findOne({ transactionId });

    if (transactionExists) {
      return res.status(400).json({ message: "Transaction has been completed before" });
    }

    const ticketPurchase = new ticketsModal({
      customerId,
      quantity,
      purchaseDate,
      total,
      paymentStatus,
      transactionId,
    });

    await ticketPurchase.save()
    return res.status(200).json({message:"Ticket bought successfully"})
  } catch (error) {
    console.log("Error" + error)
    return res.status(500).json({message:"Internal Server Error"})
  }
};

ticketController.putTicket = async (req, res) => {
    try {
        const {paymentStatus} = req.body

        const editTicket = await ticketsModal.findByIdAndUpdate(req.params.id, {paymentStatus}, {new: true})

        await editTicket.save()

        return res.status(200).json(editTicket)
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

ticketController.deleteTicket = async (req, res) => {
    try {
        const deletation = await ticketsModal.findByIdAndDelete(req.params.id)
        if(!deletation){return res.status(404).json({message:"Ticket doesn`t exists"})}
        return res.status(200).json({message:"Ticket deleted successfully"})
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export default ticketController