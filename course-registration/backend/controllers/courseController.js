const db = require('../db/database');


const getListing = (req, res) => {
    db.all('SELECT * FROM section', (err, rows) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: "Server error" });
        }

        const courseSections = rows.map(row => ({
            s_id: row.s_id,
            course_id: row.course_id,
            // instructor_id: row.instructor_id,
            semester: row.semester,
            weekday: row.weekday,
            start_time: row.start_time,
            end_time: row.end_time,
            // location: row.location,
            // max_seats: row.max_seats,
            // current_seats: row.current_seats
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

    db.get('SELECT * FROM section WHERE s_id = ?', [s_id], (err, section) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        // user is not a student, set enrollment to null
        if (userType !== 'student') {
            return res.status(200).json({
                section,
                userId, 
                type: userType,
                enrollment: null 
            });
        }

        // user is a student, check enrollment status
        // grab the latest row
        db.get(
            'SELECT status FROM enrollment WHERE student_id = ? AND section_id = ? ORDER BY timestamp DESC LIMIT 1', 
            [userId, s_id], 
            (enrollErr, enrollRow) => {
                if (enrollErr) {
                    console.error('Enrollment query error:', enrollErr);
                    return res.status(500).json({ message: "Internal server error" });
                }

                const enrollment = Boolean(enrollRow && enrollRow.status === 'Enrolled');

                res.status(200).json({
                    section,
                    userId, 
                    type: userType,
                    enrollment 
                });
            }
        );
});
};


module.exports = {
    getListing,
    getDetail
};
