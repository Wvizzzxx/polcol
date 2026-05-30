const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  getAll, getOne, create, updateOne, update, remove, getMessages, updateMessage, removeMessage
} = require('../controllers/contactController');

router.get('/', getAll);
router.get('/messages', auth, checkRole('superadmin', 'admin'), getMessages);
router.put('/messages/:id', auth, checkRole('superadmin', 'admin'), updateMessage);
router.delete('/messages/:id', auth, checkRole('superadmin', 'admin'), removeMessage);
router.post('/', auth, checkRole('superadmin', 'admin'), create);
router.put('/', auth, checkRole('superadmin', 'admin'), update);
router.get('/:id', auth, getOne);
router.put('/:id', auth, checkRole('superadmin', 'admin'), updateOne);
router.delete('/:id', auth, checkRole('superadmin', 'admin'), remove);

module.exports = router;
