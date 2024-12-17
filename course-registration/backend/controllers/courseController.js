const db = require('../db/database');

const getListing = (req, res) => {
    const query = 'SELECT * FROM section';

    db.query(query, (err, rows) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: "Server error" });
        }

        const courseSections = rows.map(row => ({
            s_id: row.s_id,
            course_id: row.course_id,
            semester: row.semester,
            weekday: row.weekday,
            start_time: row.start_time,
            end_time: row.end_time,
            full: row.max_seats === row.current_seats
        }));

        res.status(200).json({
            courseSections
        });
    });
};

const getDetail = (req, res) => {
    const { s_id } = req.params;

    if (!s_id) {
        return res.status(400).json({ message: "No section ID provided." });
    }

    const user = req.session?.user || {};
    const userId = user.id ?? null;
    const userType = user.type ?? null;

    const sectionQuery = 'SELECT * FROM section WHERE s_id = ?';
    db.query(sectionQuery, [s_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Section not found" });
        }

        const section = results[0];

        // User is not a student, return section details
        if (userType !== 'student') {
            return res.status(200).json({
                section,
                userId,
                type: userType,
                enrollment: null
            });
        }

        // User is a student, check enrollment status
        const enrollmentQuery = `
            SELECT status 
            FROM enrollment 
            WHERE student_id = ? AND section_id = ? 
            ORDER BY timestamp DESC 
            LIMIT 1
        `;

        db.query(enrollmentQuery, [userId, s_id], (enrollErr, enrollResults) => {
            if (enrollErr) {
                console.error('Enrollment query error:', enrollErr);
                return res.status(500).json({ message: "Internal server error" });
            }

            const enrollment = enrollResults.length > 0 && enrollResults[0].status === 'Enrolled';

            res.status(200).json({
                section,
                userId,
                type: userType,
                enrollment
            });
        });
    });
};

module.exports = {
    getListing,
    getDetail
};
