const Voucher = require('../models/VoucherModel');

// Create a new Voucher
const createVoucher = async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.status(201).json({ message: 'Voucher created successfully', voucher });
  } catch (error) {
    res.status(400).json({ message: 'Error creating voucher', error });
  }
};

// Get all Vouchers
const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vouchers', error });
  }
};

// Get a Voucher by ID
 const getVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching voucher', error });
  }
};

// Update a Voucher
const updateVoucher = async (req, res) => {
  try {
    const updatedVoucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVoucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    res.status(200).json({ message: 'Voucher updated successfully', updatedVoucher });
  } catch (error) {
    res.status(400).json({ message: 'Error updating voucher', error });
  }
};

// Delete a Voucher
const deleteVoucher = async (req, res) => {
  try {
    const deletedVoucher = await Voucher.findByIdAndDelete(req.params.id);
    if (!deletedVoucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    res.status(200).json({ message: 'Voucher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting voucher', error });
  }
};

module.exports = {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
};
