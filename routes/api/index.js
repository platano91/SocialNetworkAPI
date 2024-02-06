// Imports
const router = require('express').Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export
module.exports = router;
