const express = require('express');
const {
  createUnitType,
  getAllUnitTypes,
  getUnitTypeById,
  updateUnitType,
  deleteUnitType,
} = require('../controllers/unitTypeController');

const router = express.Router();

router.post('/', createUnitType);
router.get('/', getAllUnitTypes);
router.get('/:id', getUnitTypeById);
router.patch('/:id', updateUnitType);
router.delete('/:id', deleteUnitType);

module.exports = router;
