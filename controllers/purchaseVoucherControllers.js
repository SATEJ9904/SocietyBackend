const PurchaseVoucher = require('../models/purchaseVoucher');

// Create a new purchase voucher
exports.createPurchaseVoucher = async (req, res) => {
  try {
    const purchaseVoucher = new PurchaseVoucher(req.body);
    await purchaseVoucher.save();
    res.status(201).json({
      success: true,
      data: purchaseVoucher
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// Get all purchase vouchers
exports.getAllPurchaseVouchers = async (req, res) => {
  try {
    const purchaseVouchers = await PurchaseVoucher.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: purchaseVouchers.length,
      data: purchaseVouchers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get a single purchase voucher by ID
exports.getPurchaseVoucherById = async (req, res) => {
  try {
    const purchaseVoucher = await PurchaseVoucher.findById(req.params.id);
    if (!purchaseVoucher) {
      return res.status(404).json({
        success: false,
        message: 'Purchase voucher not found'
      });
    }
    res.status(200).json({
      success: true,
      data: purchaseVoucher
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Update a purchase voucher by ID
exports.updatePurchaseVoucher = async (req, res) => {
  try {
    const purchaseVoucher = await PurchaseVoucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!purchaseVoucher) {
      return res.status(404).json({
        success: false,
        message: 'Purchase voucher not found'
      });
    }
    res.status(200).json({
      success: true,
      data: purchaseVoucher
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// Delete a purchase voucher by ID
exports.deletePurchaseVoucher = async (req, res) => {
  try {
    const purchaseVoucher = await PurchaseVoucher.findByIdAndDelete(req.params.id);
    if (!purchaseVoucher) {
      return res.status(404).json({
        success: false,
        message: 'Purchase voucher not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};