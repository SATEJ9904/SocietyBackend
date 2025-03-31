const express = require('express');
const router = express.Router();
const purchaseVoucherController = require('../controllers/purchaseVoucherControllers');

// Create a new purchase voucher
router.post('/', purchaseVoucherController.createPurchaseVoucher);

// Get all purchase vouchers
router.get('/', purchaseVoucherController.getAllPurchaseVouchers);

// Get a single purchase voucher by ID
router.get('/:id', purchaseVoucherController.getPurchaseVoucherById);

// Update a purchase voucher by ID
router.put('/:id', purchaseVoucherController.updatePurchaseVoucher);

// Delete a purchase voucher by ID
router.delete('/:id', purchaseVoucherController.deletePurchaseVoucher);

module.exports = router;