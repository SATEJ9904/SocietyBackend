const mongoose = require('mongoose');
const Counter = require('./Counter'); // Import the Counter model

const accountSchema = new mongoose.Schema(
  {
    accountId: { type: Number, unique: true ,},
    accountName: { type: String, required: true },
    groupId: { type: String, required: true },
    subGroupId: { type: String, required: true },
    opening: { type: String, required: true, default: 0 },
    drOrCr: { type: String, enum: ['DR', 'CR'], required: true },
    typeCode: {
      type: String,
      enum: ['Balance Sheet', 'Profit and Loss Account', 'Trading Account'],
      required: true
    }
  },
  { timestamps: true }
);

// Pre-save middleware to auto-increment accountId
accountSchema.pre('save', async function (next) {
  if (!this.accountId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'accountId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.accountId = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;