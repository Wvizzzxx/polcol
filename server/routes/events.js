const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const { getAll, getById, create, update, remove } = require('../controllers/eventController');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', auth, checkRole('superadmin', 'admin', 'editor'), create);
router.put('/:id', auth, checkRole('superadmin', 'admin', 'editor'), update);
router.delete('/:id', auth, checkRole('superadmin', 'admin'), remove);

module.exports = router;