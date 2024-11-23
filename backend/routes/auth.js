const router = require('express').Router();
const {signup, login, getUser} = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');
const {protect} = require('../middleware/auth');



router.post('/signup', signup);
router.post('/login', login);
router.get('/user', protect, getUser);


module.exports = router;