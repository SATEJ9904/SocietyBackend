const AccountSubgroup = require('../models/AccountSubGroupModel');

// CREATE: Add a new AccountSubgroup
const createAccountSubgroup = async (req, res) => {
  try {
    const accountSubgroup = new AccountSubgroup(req.body);
    await accountSubgroup.save();
    res.status(201).json(accountSubgroup); // Return the created account subgroup
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle validation or other errors
  }
};

// READ: Get all AccountSubgroups
const getAllAccountSubgroups = async (req, res) => {
  try {
    const accountSubgroups = await AccountSubgroup.find();
    res.status(200).json(accountSubgroups); // Return all account subgroups
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors if any
  }
};

// Get all AccountSubgroups
// const getAccountSubgroups = async (req, res) => {
//   try {
//     const accountSubgroups = await AccountSubgroups.find();
//     res.status(200).json(accountGroups);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// READ: Get a specific AccountSubgroup by Id
const getAccountSubgroupById = async (req, res) => {
  try {
    const accountSubgroup = await AccountSubgroup.findById(req.params.id);
    if (!accountSubgroup) {
      return res.status(404).json({ message: "AccountSubgroup not found" });
    }
    res.status(200).json(accountSubgroup); // Return the specific account subgroup
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
};

// UPDATE: Update an existing AccountSubgroup by Id
const updateAccountSubgroup = async (req, res) => {
  try {
    const updatedAccountSubgroup = await AccountSubgroup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated object and validate
    );
    if (!updatedAccountSubgroup) {
      return res.status(404).json({ message: "AccountSubgroup not found" });
    }
    res.status(200).json(updatedAccountSubgroup); // Return updated account subgroup
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle validation errors
  }
};

// DELETE: Delete an AccountSubgroup by Id
const deleteAccountSubgroup = async (req, res) => {
  try {
    const deletedAccountSubgroup = await AccountSubgroup.findByIdAndDelete(req.params.id);
    if (!deletedAccountSubgroup) {
      return res.status(404).json({ message: "AccountSubgroup not found" });
    }
    res.status(200).json({ message: "AccountSubgroup deleted successfully" }); // Return success message
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors if any
  }
};

module.exports = {
  createAccountSubgroup,
  getAllAccountSubgroups,
  getAccountSubgroupById,
  updateAccountSubgroup,
  deleteAccountSubgroup
};
