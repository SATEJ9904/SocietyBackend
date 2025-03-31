const InvoiceHeader = require('../models/InvoiceHeaderModel');
const mongoose = require('mongoose');

// Create a new invoice header
const createInvoiceHeader = async (req, res) => {
  try {
    const invoiceHeader = new InvoiceHeader(req.body);
    console.log("📥 Data Received:", invoiceHeader);
    
    const savedInvoice = await invoiceHeader.save();
    console.log("✅ Data Saved:", savedInvoice); // Check if it's saved

    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error("❌ Error saving invoice:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all invoice headers
const getInvoiceHeaders = async (req, res) => {
  try {
    const invoices = await InvoiceHeader.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an invoice header by ID
const getInvoiceHeaderById = async (req, res) => {
  try {
    const invoice = await InvoiceHeader.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice header not found' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an invoice header by ID
const updateInvoiceHeader = async (req, res) => {
  try {
    const invoice = await InvoiceHeader.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!invoice) return res.status(404).json({ message: 'Invoice header not found' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an invoice header by ID
const deleteInvoiceHeader = async (req, res) => {
  try {
    const invoice = await InvoiceHeader.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice header not found' });
    res.status(200).json({ message: 'Invoice header deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInvoiceHeader,
  getInvoiceHeaders,
  getInvoiceHeaderById,
  updateInvoiceHeader,
  deleteInvoiceHeader
};
