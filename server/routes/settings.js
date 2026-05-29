const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const { get, update } = require('../controllers/settingsController');

router.get('/', get);
router.put('/', auth, checkRole('superadmin', 'admin'), update);

module.exports = router;