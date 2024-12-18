const express = require('express');
const router = express.Router();
const { auth, getInstructorDash, getCreateSection, postCreateSection, postEnrollSection } = require('../controllers/userController');


router.get('/instructor', auth, getInstructorDash);
router.get('/dashboard/create', auth, getCreateSection);
router.post('/dashboard/create', auth, postCreateSection);
router.post('/enroll', auth, postEnrollSection);


router.get("/me", (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
  
    const { userId, type } = req.session.user;
    res.json({ userId, type });
  });
  


module.exports = router;
