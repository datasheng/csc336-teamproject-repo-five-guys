const express = require('express');
const db = require('../db/database');
const router = express.Router();

function auth(req, res, next) {
    console.log("OK")
    console.log(req.session);
    if (!req.session.user) {
        return res.redirect('http://localhost:3000/login');
    }
    next();
}

router.get('/dashboard', auth, (req, res) => {
    const userId = req.session.user.id;
    const type = req.session.user.type;

    if(type == "instructor"){
        db.all(`SELECT * FROM section WHERE instructor_id = ?`, [userId], (err, sections) => {
            if (err) {
                return res.status(500).send('Error retrieving sections.');
            }
            res.render('dashboard', {
                sections,
                type,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name
            });
        });
    } else {
        db.all(`SELECT * FROM section WHERE student_id = ?`, [userId], (err, sections) => {
            if (err) {
                return res.status(500).send('Error retrieving sections.');
            }
            const current_sections = new Set();
            for (const section of sections){
                if (current_sections.has(section.section_id) && section.status == "Dropped"){
                    current_sections.delete(section.section_id);
                } else {
                    current_sections.add(section.section_id);
                }
            }

            res.render('dashboard', {
                current_sections,
                type,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name
            });
        });
    }
});

router.get('/dashboard/create', auth, (req, res) => {
    const userId = req.session.user.id;
    const type = req.session.user.type;

    if(type == "instructor"){
        db.all(`SELECT * FROM course`, (err, courses) => {
            if (err) {
                return res.status(500).send('Error retrieving courses.');
            }
            res.render('dashboard', {
                courses,
                userId,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name
            });
        });
    } else {
        return res.status(500).send('You must be an instructor to create courses.');
    }
});

module.exports = router;
