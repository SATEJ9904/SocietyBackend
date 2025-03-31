const mongoose = require('mongoose');
const Counter = require("./Counter"); // Import Counter model


const paymentVoucherSchema = new mongoose.Schema({
  voucherNumber: { type: Number, unique: true }, // Auto-incrementing voucher number
  date: { type: Date, required: true },
  nameOfCreditor: { type: String, required: true },
  amountPaidDr: { type: Number, required: true },
  bank: { type: String },
  drName: { type: String },
  amountPaidCr: { type: Number, required: true },
  transactionType: { type: String, required: true },
  instNo: { type: String },
  chequeNo: { type: String },
  instDate: { type: Date },
  narration: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

paymentVoucherSchema.pre("save", async function (next) {
  if (!this.voucherNumber) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "voucherNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.voucherNumber = counter.seq;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const PaymentVoucher = mongoose.model('PaymentVoucher', paymentVoucherSchema);

module.exports = PaymentVoucher;