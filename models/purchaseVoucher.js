const mongoose = require('mongoose');
const Counter = require("./Counter"); // Import Counter model


const purchaseVoucherSchema = new mongoose.Schema({
  voucherNumber: {
    type: Number,
    unique: true
  }, // Auto-incrementing voucher number
  date: {
    type: Date,
    required: true
  },
  refBillNo: {
    type: String,
    required: true
  },
  drNameOfLedger: {
    type: String,
    required: true
  },
  crTdsPayable: {
    type: Number,
    required: true
  },
  sgst: {
    type: Number,
    required: true
  },
  billDate: {
    type: Date,
    required: true
  },
  crNameOfCreditor: {
    type: String,
    required: true
  },
  amountOfBill: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  cgst: {
    type: Number,
    required: true
  },
  billNo: {
    type: String,
    required: true
  },
  billPeriod: {
    type: String,
    required: true
  },
  narration: {
    type: String,
    required: false
  },
  customerNo: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


purchaseVoucherSchema.pre("save", async function (next) {
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

// Update the updatedAt field before saving
purchaseVoucherSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const PurchaseVoucher = mongoose.model('PurchaseVoucher', purchaseVoucherSchema);

module.exports = PurchaseVoucher;