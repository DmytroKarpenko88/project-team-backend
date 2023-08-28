const router = require('express').Router();

const ctlr = require('../../controllers/friends');

router.get('/getAll', ctlr.getFriends);

module.exports = router;
