const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // Use mongoose-sequence

const receiptVoucherSchema = new mongoose.Schema(
  {
    voucherDate: {
      type: Date,
    },
    voucherNumber: {
      type: Number,
      unique: true,
    },
    narration: {
      type: String,
    },
    drAccount: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      accountId: { type: Number, required: true },
      accountName: { type: String, required: true },
      drOrCr: { type: String, required: true },
    },
    crAccount: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      accountId: { type: Number, required: true },
      accountName: { type: String, required: true },
      drOrCr: { type: String, required: true },
    },
    crAmount: {
      type: Number,
      required: true,
    },
    referenceInvoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    transactionType: {
      type: String,
    },
    instrumentNumber: {
      type: String,
    },
    instrumentDate: {
      type: Date,
      default: Date.now,
    },
    instrumentBank: {
      type: String,
    },
    instrumentBranch: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// ✅ Use `mongoose-sequence` to auto-increment voucherNumber
receiptVoucherSchema.plugin(AutoIncrement, { inc_field: "voucherNumber" });

const ReceiptVoucher = mongoose.model("ReceiptVoucher", receiptVoucherSchema);

module.exports = ReceiptVoucher;
