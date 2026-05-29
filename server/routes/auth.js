const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  login, getMe, getUsers, createUser, updateUser, deleteUser
} = require('../controllers/authController');

router.post('/login', login);
router.get('/me', auth, getMe);
router.get('/users', auth, checkRole('superadmin', 'admin'), getUsers);
router.post('/users', auth, checkRole('superadmin', 'admin'), createUser);
router.put('/users/:id', auth, checkRole('superadmin', 'admin'), updateUser);
router.delete('/users/:id', auth, checkRole('superadmin'), deleteUser);

module.exports = router;