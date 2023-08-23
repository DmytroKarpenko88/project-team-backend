const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// router.get('/verify/:verificationCode', ctrl.verifyEmail);
router.get('/verify/:verificationToken', ctrl.verifyEmail);

// signin
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/subs');

module.exports = router;
