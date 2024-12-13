const express = require('express');
const router = express.Router();
const { auth, getDashboard, getCreateDashboard } = require('../controllers/userController');


router.get('/dashboard', auth, getDashboard);
router.get('/dashboard/create', auth, getCreateDashboard);


module.exports = router;
