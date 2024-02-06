// Imports
const router = require('express').Router();

const apiRoutes = require('./api');

// Mount API routes
router.use('/api', apiRoutes);

// Catch-all route
router.use((req, res) => res.send('Wrong route!'));

// Export
module.exports = router;
