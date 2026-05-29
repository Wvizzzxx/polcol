const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  getAll, getBySlug, getById, create, update, remove
} = require('../controllers/newsController');

router.get('/', getAll);
router.get('/slug/:slug', getBySlug);
router.get('/:id', getById);
router.post('/', auth, checkRole('superadmin', 'admin', 'editor'), create);
router.put('/:id', auth, checkRole('superadmin', 'admin', 'editor'), update);
router.delete('/:id', auth, checkRole('superadmin', 'admin'), remove);

module.exports = router;