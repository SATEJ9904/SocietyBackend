const mongoose = require("mongoose");
const Counter = require("./Counter"); // Import Counter model

const contraVoucherSchema = new mongoose.Schema({
  voucherNumber: { type: Number, unique: true }, // Auto-incrementing voucher number
  date: { type: Date, required: true },
  amountWithdrawn: { type: Number, required: true },
  previousOSBills: { type: String },
  transactionType: { type: String, required: true },
  instNo: { type: String },
  chequeNo: { type: String },
  instDate: { type: Date },
  bankName: { type: String },
  branchName: { type: String },
  narration: { type: String },
  crNameOfCreditor: { type: String },
  nameOfLedger: { type: String },
  crAmountWithdraw: { type: Number },
  amount: { type: Number },
  branch: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Pre-save hook to generate auto-incrementing voucherNumber
contraVoucherSchema.pre("save", async function (next) {
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

const ContraVoucher = mongoose.model("ContraVoucher", contraVoucherSchema);

module.exports = ContraVoucher;
