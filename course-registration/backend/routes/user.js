const express = require('express');
const router = express.Router();
const { auth, getInstructorDash , getCreateSection , postCreateSection } = require('../controllers/userController');


router.get('/instructor', auth, getInstructorDash);
router.get('/dashboard/create', auth, getCreateSection);
router.post('/dashboard/create', auth, postCreateSection);


module.exports = router;
