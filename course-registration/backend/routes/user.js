const express = require('express');
const router = express.Router();
const { auth, getInstructorDash , getCreateSection } = require('../controllers/userController');


router.get('/instructor', auth, getInstructorDash);
router.get('/dashboard/create', auth, getCreateSection);


module.exports = router;
