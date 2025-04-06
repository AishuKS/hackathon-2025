const express = require('express');
const router = express.Router();
const { signupSharer, signupFinder, login } = require('../controllers/authController');

router.post('/signup/sharer', signupSharer);
router.post('/signup/finder', signupFinder);
router.post('/login', login);

module.exports = router;
