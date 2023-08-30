const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/news');

router.get('/getAll', ctrl.getAllNews);

module.exports = router;
