const router = require('express').Router();

const workoutRoutes = require('./workoutRoutes');

router.use('/', workoutRoutes);

module.exports = router;
