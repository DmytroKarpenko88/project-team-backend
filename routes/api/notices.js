const express = require('express');
const router = express.Router();

const { getAllNotices, postNotice } = require('../../controllers/notices');

router.get('/', getAllNotices);

router.post('/', postNotice);

module.exports = router;
