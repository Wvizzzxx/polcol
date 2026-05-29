const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  getAll, update, getMessages, updateMessage, removeMessage
} = require('../controllers/contactController');

router.get('/', getAll);
router.put('/', auth, checkRole('superadmin', 'admin'), update);
router.get('/messages', auth, checkRole('superadmin', 'admin'), getMessages);
router.put('/messages/:id', auth, checkRole('superadmin', 'admin'), updateMessage);
router.delete('/messages/:id', auth, checkRole('superadmin', 'admin'), removeMessage);

module.exports = router;