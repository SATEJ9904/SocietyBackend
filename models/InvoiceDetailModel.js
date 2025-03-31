const mongoose = require('mongoose');

const InvoiceDetailSchema = new mongoose.Schema({
  invoiceId: { 
    type: mongoose.Schema.Types.ObjectId, // Reference to InvoiceHeader's _id
    ref: 'InvoiceHeader', 
    required: true 
  },  serviceIds: [{ type: Number, required: true }], // Array of service IDs
  amounts: [{ type: String, required: true }], // Array of amounts
}, { timestamps: true });

const InvoiceDetail = mongoose.model('InvoiceDetail', InvoiceDetailSchema);
module.exports = InvoiceDetail;
