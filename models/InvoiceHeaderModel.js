const mongoose = require("mongoose");
const Counter = require("./Counter"); 

const InvoiceHeaderSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: Number,  },
    invoiceDate: { type: Date, required: true },
    memberId: { type: String, required: true },
    period: { type: String, required: true, maxlength: 50 },
    dueDate: { type: Date, required: true },
    amtInWords: { type: String },
    narration: { type: String, required: true, maxlength: 200 }
  },
  { timestamps: true }
);

// 🔥 Auto-increment invoiceNumber using Counter
InvoiceHeaderSchema.pre("save", async function (next) {
  if (!this.invoiceNumber) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "invoiceNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.invoiceNumber = counter.seq;
    } catch (error) {
      console.error("❌ Error updating counter:", error);
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("InvoiceHeader", InvoiceHeaderSchema);
