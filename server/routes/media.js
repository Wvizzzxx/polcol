const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getAll, upload: uploadFile, remove } = require('../controllers/mediaController');

router.get('/', getAll);
router.post('/upload', auth, checkRole('superadmin', 'admin', 'editor'), upload.single('file'), uploadFile);
router.delete('/:id', auth, checkRole('superadmin', 'admin'), remove);

module.exports = router;