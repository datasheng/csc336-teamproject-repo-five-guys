const express = require('express');
const router = express.Router();
const { getListing, getDetail } = require('../controllers/courseController');


router.get('/', getListing);
router.get('/detail', getDetail);

module.exports = router;
