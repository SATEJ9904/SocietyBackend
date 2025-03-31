const express = require('express');
const router = express.Router();
const {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
} = require('../controllers/VoucherController');

router.post('/', createVoucher);
router.get('/', getAllVouchers);
router.get('/:id', getVoucherById);
router.patch('/:id', updateVoucher);
router.delete('/:id', deleteVoucher);

module.exports = router;
