const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', ensureAuthenticated, (req, res) => res.render('task_management'));
//router.get('/', ensureAuthenticated, (req, res) => res.send('asdsa'));

module.exports = router;
