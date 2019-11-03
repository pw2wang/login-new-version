const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const server = require('http').createServer(router)


router.get('/', ensureAuthenticated, (req, res) =>
    res.render('map')
);



module.exports = router;