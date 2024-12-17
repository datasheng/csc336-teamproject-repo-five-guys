const db = require('../db/database');

const auth = (req, res, next) => {
    console.log("Session:", req.session);
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

const getInstructorDash = (req, res) => {
    const { userId, type } = req.session.user;

    if (type === "instructor") {
        const query = `
            SELECT 
                section.s_id AS section_id,
                section.semester,
                section.weekday,
                section.start_time,
                section.end_time,
                course.c_id,
                course.course_name,
                course.description
            FROM section
            JOIN course ON section.course_id = course.c_id
            WHERE section.instructor_id = ?
        `;
        db.query(query, [userId], (err, sections) => {
            if (err) {
                console.error(err);
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
        const query = `
            SELECT 
                section.s_id AS section_id,
                section.semester,
                section.weekday,
                section.start_time,
                section.end_time,
                course.c_id AS course_id,
                course.course_name,
                course.description,
                enrollment.status
            FROM section
            JOIN course ON section.course_id = course.c_id
            JOIN enrollment ON section.s_id = enrollment.section_id
            WHERE enrollment.student_id = ?
        `;

        db.query(query, [userId], (err, sections) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error retrieving sections.' });
            }

            const current_sections = new Map();
            for (const section of sections) {
                if (current_sections.has(section.section_id) && section.status === "Dropped") {
                    current_sections.delete(section.section_id);
                } else {
                    current_sections.set(section.section_id, section);
                }
            }

            res.status(200).json({
                current_sections: Array.from(current_sections.values()),
                type,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name
            });
        });
    }
};

const getCreateSection = (req, res) => {
    const { userId, type } = req.session.user;

    if (type === "instructor") {
        const query = `SELECT * FROM course`;

        db.query(query, (err, courses) => {
            if (err) {
                console.error(err);
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
        return res.status(403).json({ error: 'You must be an instructor to create a section.' });
    }
};

const postCreateSection = (req, res) => {
    const { userId, type } = req.session.user;

    if (type !== "instructor") {
        return res.status(403).json({ error: 'You must be an instructor to create a section.' });
    }

    const {
        course_id,
        semester,
        weekday,
        start_time,
        end_time,
        location,
        max_seats
    } = req.body;

    if (!course_id || !semester || !weekday || !start_time || !end_time || !location || !max_seats) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = `
        INSERT INTO section (course_id, instructor_id, semester, weekday, start_time, end_time, location, max_seats, current_seats)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
    `;
    const params = [course_id, userId, semester, weekday, start_time, end_time, location, max_seats];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error creating section.' });
        }

        res.status(201).json({ 
            message: 'Section created successfully.',
            section_id: results.insertId // Use insertId for MySQL
        });
    });
};

module.exports = {
    auth,
    getInstructorDash,
    getCreateSection,
    postCreateSection
};
