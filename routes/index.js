const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes.js');
router.use('/users', usersRoutes);

const messagesRoutes = require('./messagesRoutes.js');
router.use('/messages', messagesRoutes);

const peopleRoutes = require('./peopleRoutes.js');
router.use('/people', peopleRoutes);

module.exports = router;