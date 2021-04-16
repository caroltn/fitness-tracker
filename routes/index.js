const router = require('express').Router()

router.use('/api', require('./workoutRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router