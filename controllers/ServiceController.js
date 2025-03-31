const Service = require('../models/ServiceModel');

// Create a new Service
const createService = async (req, res) => {
  try {
    const {id, serviceName, charges } = req.body;
    const newService = new Service({ id, serviceName, charges });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    res.status(200).json(service); // Fixed from 'Service' to 'service'
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Service
const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Service
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all CRUD functions
module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
