const express = require('express');
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require('../controllers/ServiceController');

const router = express.Router();

router.post('/', createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.patch('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;



