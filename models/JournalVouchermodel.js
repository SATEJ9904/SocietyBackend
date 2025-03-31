const mongoose = require("mongoose");
const Counter = require("./Counter");

const JournalVoucherSchema = new mongoose.Schema(
  {
    voucherNumber: { type: Number, unique: true }, // Auto-incremented
    date: { type: String, required: true },
    debitLedger: { type: String },
    creditLedger: { type: String },
    debitAmount: { type: Number },
    creditAmount: { type: Number },
    narration: { type: String },
  },
  { timestamps: true }
);

JournalVoucherSchema.pre("save", async function (next) {
  if (this.isNew && (this.voucherNumber === undefined || this.voucherNumber === null)) {
    try {
      console.log("🔵 Checking counter before saving...");
      
      const counter = await Counter.findOneAndUpdate(
        { name: "journalVoucher" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      if (!counter) {
        console.error("🔴 Counter not found or failed to create!");
        throw new Error("Counter not found or failed to create");
      }

      console.log("🟢 Counter updated, new seq:", counter.seq);
      this.voucherNumber = counter.seq;
      next();
    } catch (error) {
      console.error("🔴 Error in auto-increment:", error.message);
      next(error);
    }
  } else {
    next();
  }
});

const JournalVoucher = mongoose.model("JournalVoucher", JournalVoucherSchema);
module.exports = JournalVoucher;
