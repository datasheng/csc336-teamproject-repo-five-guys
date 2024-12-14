// controllers/userController.js
const db = require('../db/database');

const auth = (req, res, next) => {
    console.log("Session data:", req.session);
    if (!req.session.user) {
        console.log("nyooo?");
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

const getInstructorDash = (req, res) => {
    console.log("OOOK");
    const userId = req.session.user.id;
    const type = req.session.user.type;
    console.log(req.session.user);
    if (type === "instructor") {
        db.all(`SELECT * FROM section WHERE instructor_id = ?`, [userId], (err, sections) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving sections.' });
            }
            res.status(200).json({
                sections,
                type,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name
            });
        });
    } else {
        db.all(`SELECT * FROM section WHERE student_id = ?`, [userId], (err, sections) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving sections.' });
            }

            const current_sections = new Set();
            for (const section of sections) {
                if (current_sections.has(section.section_id) && section.status === "Dropped") {
                    current_sections.delete(section.section_id);
                } else {
                    current_sections.add(section.section_id);
                }
            }

            res.status(200).json({
                current_sections: Array.from(current_sections),
                type,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name
            });
        });
    }
};

const getCreateSection = (req, res) => {
    const userId = req.session.user.id;
    const type = req.session.user.type;

    if (type === "instructor") {
        db.all(`SELECT * FROM course`, (err, courses) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving courses.' });
            }
            res.status(200).json({
                courses,
                userId,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name
            });
        });
    } else {
        return res.status(403).json({ error: 'You must be an instructor to create courses.' });
    }
};

module.exports = {
    auth,
    getInstructorDash,
    getCreateSection
};