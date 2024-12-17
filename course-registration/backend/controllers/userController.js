const db = require('../db/database');

// Middleware: Authorization check
const auth = (req, res, next) => {
    console.log("Session:", req.session);
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Instructor Dashboard: View Sections
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
        return res.status(403).json({ error: 'Unauthorized: Not an instructor.' });
    }
};

// Instructor: View Courses to Create Section
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

// Instructor: Create Section
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
            section_id: results.insertId
        });
    });
};

// Student: Enroll in a Section
const postEnrollSection = (req, res) => {
    const { userId, type } = req.session.user;

    if (type !== "student") {
        return res.status(403).json({ error: 'Only students can enroll in sections.' });
    }

    const { section_id } = req.body;

    if (!section_id) {
        return res.status(400).json({ error: 'Section ID is required.' });
    }

    // Check for duplicate enrollment
    const checkQuery = "SELECT * FROM enrollment WHERE student_id = ? AND section_id = ?";
    db.query(checkQuery, [userId, section_id], (err, rows) => {
        if (err) {
            console.error("Error checking enrollment:", err);
            return res.status(500).json({ error: "Failed to check enrollment." });
        }

        if (rows.length > 0) {
            return res.status(400).json({ error: "You are already enrolled in this section." });
        }

        // Insert enrollment
        const enrollQuery = `
            INSERT INTO enrollment (student_id, section_id)
            VALUES (?, ?)
        `;
        db.query(enrollQuery, [userId, section_id], (err) => {
            if (err) {
                console.error("Error enrolling in section:", err);
                return res.status(500).json({ error: "Failed to enroll in section." });
            }
            res.status(201).json({ message: "Enrolled successfully!" });
        });
    });
};

module.exports = {
    auth,
    getInstructorDash,
    getCreateSection,
    postCreateSection,
    postEnrollSection
};
