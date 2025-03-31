const express = require('express');
const  {
    createAccountGroup,
    getAccountGroups,
    getAccountGroupById,
    updateAccountGroup,
    deleteAccountGroup,
  } = require('../controllers/AccountGroupController');

  const router = express.Router();

// Routes for accounts
router.post('/', createAccountGroup);
router.get('/', getAccountGroups);
router.get('/:id', getAccountGroupById);
router.patch('/:id', updateAccountGroup);
router.delete('/:id', deleteAccountGroup);

module.exports = router;

