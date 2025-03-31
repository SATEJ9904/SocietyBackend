const PaymentVoucher = require('../models/paymentVoucherModel');

// Create a new payment voucher
const createPaymentVoucher = async (req, res) => {
  try {
    const {
      srNo,
      date,
      nameOfCreditor,
      amountPaidDr,
      previousOSBills,
      bank,
      drName,
      amountPaidCr,
      transactionType,
      instNo,
      chequeNo,
      instDate,
      narration
    } = req.body;

    const paymentVoucher = new PaymentVoucher({
      srNo,
      date,
      nameOfCreditor,
      amountPaidDr,
      previousOSBills,
      bank,
      drName,
      amountPaidCr,
      transactionType,
      instNo,
      chequeNo,
      instDate,
      narration
    });

    const savedPaymentVoucher = await paymentVoucher.save();
    res.status(201).json(savedPaymentVoucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all payment vouchers
const getAllPaymentVouchers = async (req, res) => {
  try {
    const paymentVouchers = await PaymentVoucher.find().sort({ createdAt: -1 });
    res.json(paymentVouchers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single payment voucher by ID
const getPaymentVoucherById = async (req, res) => {
  try {
    const paymentVoucher = await PaymentVoucher.findById(req.params.id);
    if (!paymentVoucher) {
      return res.status(404).json({ message: 'Payment voucher not found' });
    }
    res.json(paymentVoucher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment voucher by ID
const updatePaymentVoucher = async (req, res) => {
  try {
    const {
      srNo,
      date,
      nameOfCreditor,
      amountPaidDr,
      previousOSBills,
      bank,
      drName,
      amountPaidCr,
      transactionType,
      instNo,
      chequeNo,
      instDate,
      narration
    } = req.body;

    const updatedPaymentVoucher = await PaymentVoucher.findByIdAndUpdate(
      req.params.id,
      {
        srNo,
        date,
        nameOfCreditor,
        amountPaidDr,
        previousOSBills,
        bank,
        drName,
        amountPaidCr,
        transactionType,
        instNo,
        chequeNo,
        instDate,
        narration,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!updatedPaymentVoucher) {
      return res.status(404).json({ message: 'Payment voucher not found' });
    }
    res.json(updatedPaymentVoucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment voucher by ID
const deletePaymentVoucher = async (req, res) => {
  try {
    const deletedPaymentVoucher = await PaymentVoucher.findByIdAndDelete(req.params.id);
    if (!deletedPaymentVoucher) {
      return res.status(404).json({ message: 'Payment voucher not found' });
    }
    res.json({ message: 'Payment voucher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPaymentVoucher,
  getAllPaymentVouchers,
  getPaymentVoucherById,
  updatePaymentVoucher,
  deletePaymentVoucher
};