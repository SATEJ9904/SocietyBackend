
const AccountGroup = require('../models/AccountGroupModel');


// Create a new AccountGroup
const createAccountGroup = async (req, res) => {
  try {
    const accountGroup = new AccountGroup(req.body);
    await accountGroup.save();
    res.status(201).json(accountGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all AccountGroup
const getAccountGroups = async (req, res) => {
  try {
    const accountGroups = await AccountGroup.find();
    res.status(200).json(accountGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an AccountGroup by ID
const getAccountGroupById = async (req, res) => {
  try {
    const accountGroup = await AccountGroup.findById(req.params.id);
    if (!accountGroup) return res.status(404).json({ message: 'AccountGroup not found' });
    res.status(200).json(accountGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an AccountGroup by ID
const updateAccountGroup = async (req, res) => {
  try {
    const accountGroup = await AccountGroup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!accountGroup) return res.status(404).json({ message: 'AccountGroup not found' });
    res.status(200).json(accountGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an AccountGroup by ID
const deleteAccountGroup = async (req, res) => {
  try {
    const accountGroup = await AccountGroup.findByIdAndDelete(req.params.id);
    if (!accountGroup) return res.status(404).json({ message: 'AccountGroup not found' });
    res.status(200).json({ message: 'AccountGroup deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAccountGroup,
  getAccountGroups,
  getAccountGroupById,
  updateAccountGroup,
  deleteAccountGroup,
};
