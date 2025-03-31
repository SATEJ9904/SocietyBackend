const mongoose = require("mongoose");
//const { Schema } = mongoose;

const VoucherSchema = new mongoose.Schema({
    VId: { type: Number, required: true},
    VoucherTypeId: { type: Number, required: true },
    VoucherNo: { type: Number, required: true },
    VoucherDate: { type: Date, required: true },
    Narration: { type: String, required: true },
    Active: { type: Boolean, required: true, default: true },
    CreatedBy: { type: String, required: true },
    CreatedOn: { type: Date, required: true, default: Date.now },
    UpdatedBy: { type: String, required: false },
    UpdatedOn: { type: Date, required: false },
    UpdateCount: { type: Number, required: true, default: 0 }
},
{ timestamps: true });

const Voucher = mongoose.model('Voucher', VoucherSchema);

module.exports = Voucher;

