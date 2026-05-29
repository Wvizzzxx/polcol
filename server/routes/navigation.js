const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const { getAll, update } = require('../controllers/navigationController');

router.get('/', getAll);
router.put('/', auth, checkRole('superadmin', 'admin'), update);

module.exports = router;