const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const { getStats, getRecentActivity } = require('../controllers/dashboardController');

router.get('/stats', auth, checkRole('superadmin', 'admin', 'editor', 'viewer'), getStats);
router.get('/recent', auth, checkRole('superadmin', 'admin', 'editor', 'viewer'), getRecentActivity);

module.exports = router;