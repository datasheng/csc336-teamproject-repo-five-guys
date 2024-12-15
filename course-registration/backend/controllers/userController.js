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
        db.all(query, [userId], (err, sections) => {
            console.log(err);
            if (err) {
                return res.status(500).json({ error: 'Error retrieving sections.' });
            }
            console.log("OK");
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
                course.course_id,
                course.course_name,
                course.description,
                section.status
            FROM section
            JOIN course ON section.course_id = course.c_id
            WHERE section.student_id = ?
        `;

        db.all(query, [userId], (err, sections) => {
            if (err) {
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
        return res.status(403).json({ error: 'You must be an instructor to create a section.' });
    }
};

const postCreateSection = (req, res) => {
    const { userId, type } = req.session.user;

    if (type !== "instructor") {
        return res.status(403).json({ error: 'You must be an instructor to create a section.' });
    }

    // grab inputs from req
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

    db.run(sql, params, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error creating section.' });
        }

        res.status(201).json({ 
            message: 'Section created successfully.',
            // section_id: this.lastID 
        });
    });
};


module.exports = {
    auth,
    getInstructorDash,
    getCreateSection,
    postCreateSection
};
