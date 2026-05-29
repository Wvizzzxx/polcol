const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  getAll, getByPath, getById, create, update, updateSections, remove
} = require('../controllers/pageController');

router.get('/', getAll);
router.get('/by-path', getByPath);
router.get('/:id', getById);
router.post('/', auth, checkRole('superadmin', 'admin', 'editor'), create);
router.put('/:id', auth, checkRole('superadmin', 'admin', 'editor'), update);
router.put('/:id/sections', auth, checkRole('superadmin', 'admin', 'editor'), updateSections);
router.delete('/:id', auth, checkRole('superadmin', 'admin'), remove);

module.exports = router;