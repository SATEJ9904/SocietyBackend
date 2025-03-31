// const express = require('express');
// const router = express.Router();
// const accountSubgroupController = require("../controllers/AccountSubgroupController");

// // CREATE
// router.post('/accountsubgroups', accountSubgroupController.createAccountSubgroup);

// // READ: All AccountSubgroups
// router.get('/accountsubgroups', accountSubgroupController.getAllAccountSubgroups);

// // READ: Single AccountSubgroup by ID
// router.get('/accountsubgroups/:id', accountSubgroupController.getAccountSubgroupById);

// // UPDATE: AccountSubgroup by ID
// router.put('/accountsubgroups/:id', accountSubgroupController.updateAccountSubgroup);

// // DELETE: AccountSubgroup by ID
// router.delete('/accountsubgroups/:id', accountSubgroupController.deleteAccountSubgroup);

// module.exports = router;


const express = require('express');
const  {
    createAccountSubgroup,
    getAllAccountSubgroups,
    getAccountSubgroupById,
    updateAccountSubgroup,
    deleteAccountSubgroup,
  } = require('../controllers/AccountSubgroupController');

  const router = express.Router();

// Routes for accounts
router.post('/', createAccountSubgroup);
router.get('/', getAllAccountSubgroups);
router.get('/:id', getAccountSubgroupById);
router.patch('/:id', updateAccountSubgroup);
router.delete('/:id', deleteAccountSubgroup);

module.exports = router;

