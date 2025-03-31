const express = require('express');
const  {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  searchGroupAccounts
  // getAccountByAccountId
  } = require('../controllers/AccountController');

  const router = express.Router();

// Routes for accounts
router.post('/', createAccount);
router.get('/', getAccounts);
router.get('/search', searchGroupAccounts);
router.get('/:id', getAccountById);
// router.get('/accounts/:accountId',getAccountByAccountId);
router.patch('/:id', updateAccount);
router.delete('/:id', deleteAccount);

module.exports = router;