const Account = require('../models/AccountModel');

// Create a new account
const createAccount = async (req, res) => {
  try {
    const account = new Account(req.body);
    console.log(account);
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all accounts with optional filtering by groupId
const getAccounts = async (req, res) => {
  try {
    const { groupId, search, limit = 10 } = req.query;
    let query = {};

    if (groupId) {
      query.groupId = groupId;
    }

    if (search && search.length >= 2) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { accountId: searchRegex },
        { email: searchRegex },
        { phone: searchRegex }
      ];
    }

    const accounts = await Account.find(query)
      .limit(parseInt(limit))
      .sort({ name: 1 });

    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search accounts within a specific group (optimized for real-time suggestions)
const searchGroupAccounts = async (req, res) => {
  try {
    const { groupId, query, limit = 5 } = req.query;

    if (!groupId) {
      return res.status(400).json({ message: 'Group ID is required' });
    }

    if (!query || query.length < 2) {
      return res.json([]);
    }

    const searchRegex = new RegExp(query, 'i');

    const accounts = await Account.find({
      groupId,
      $or: [
        { name: searchRegex },
        { accountId: searchRegex }
      ]
    })
    .limit(parseInt(limit))
    .select('name accountId email phone'); // Return only essential fields

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an account by ID
const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get account by accountId
const getAccountByAccountId = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findOne({ accountId });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an account by ID
const updateAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an account by ID
const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  getAccountByAccountId,
  searchGroupAccounts // Add the new search endpoint
};